import React, { useEffect, useRef, useState } from "react";
import Board from "./components/Board";
import Controls from "./components/Controls";
import { generateBoard, revealCell, toggleFlag, checkWin } from "./utils/board";
import type { Cell } from "./types";

// Tipos posibles del estado del juego
type Status = "idle" | "playing" | "won" | "lost";

// Genera una key única para guardar el mejor tiempo según tamaño y minas
function bestTimeKey(rows: number, cols: number, mines: number) {
  return `bestTime-${rows}x${cols}-${mines}`;
}

export default function App() {
  // Configuración inicial del tablero
  const [rows, setRows] = useState(8);
  const [cols, setCols] = useState(8);
  const [mines, setMines] = useState(10);

  const [board, setBoard] = useState<Cell[][]>(() => generateBoard(rows, cols, mines));
  const [status, setStatus] = useState<Status>("idle");

  // Timer
  const [time, setTime] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Función para reiniciar o iniciar el juego
  const resetGame = (r = rows, c = cols, m = mines) => {
    setBoard(generateBoard(r, c, m));
    setStatus("playing");
    setTime(0);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => setTime(t => t + 1), 1000);
  };

  // Limpiar interval al desmontar
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  // Actualizar tablero si cambian filas, columnas o minas y el juego está idle
  useEffect(() => {
    if (status === "idle") {
      setBoard(generateBoard(rows, cols, mines));
    }
  }, [rows, cols, mines]);

  // Manejar cambios de configuración desde los controles
  const handleSettingsChange = (r: number, c: number, m: number) => {
    setRows(r);
    setCols(c);
    setMines(m);
    if (status === "idle") setBoard(generateBoard(r, c, m));
  };

  // Click izquierdo en celda
  const handleLeftClick = (r: number, c: number) => {
    if (status === "idle") {
      resetGame(rows, cols, mines);
      return;
    }
    if (status !== "playing") return;

    const { board: newBoard, exploded } = revealCell(board, r, c);
    setBoard(newBoard);

    if (exploded) {
      setStatus("lost");
      if (timerRef.current) window.clearInterval(timerRef.current);
      return;
    }

    if (checkWin(newBoard)) {
      setStatus("won");
      if (timerRef.current) window.clearInterval(timerRef.current);

      // Guardar mejor tiempo en localStorage
      const key = bestTimeKey(rows, cols, mines);
      const prev = localStorage.getItem(key);
      const prevNum = prev ? Number(prev) : null;
      if (prevNum === null || time < prevNum) {
        localStorage.setItem(key, String(time));
      }
    }
  };

  // Click derecho en celda (marcar/desmarcar bandera)
  const handleRightClick = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (status === "idle") {
      resetGame(rows, cols, mines);
      return;
    }
    if (status !== "playing") return;
    const newBoard = toggleFlag(board, r, c);
    setBoard(newBoard);
  };

  // Reiniciar juego desde controles
  const handleReset = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    resetGame(rows, cols, mines);
  };

  // Obtener mejor tiempo desde localStorage
  const best = (() => {
    const key = bestTimeKey(rows, cols, mines);
    const v = localStorage.getItem(key);
    return v ? Number(v) : null;
  })();

  return (
    <div className="app-container">
      <h1>Buscaminas (React + TS)</h1>

      {/* Controles de configuración y timer */}
      <Controls
        rows={rows}
        cols={cols}
        mines={mines}
        onChangeSettings={handleSettingsChange}
        onReset={handleReset}
        time={time}
        bestTime={best}
        playing={status === "playing"}
      />

      {/* Tablero de juego */}
      <div className="board-wrapper">
        <Board board={board} onLeftClick={handleLeftClick} onRightClick={handleRightClick} />
      </div>

      {/* Mensajes de estado */}
      <div className="status-message">
        {status === "won" && (
          <div className="won">
            ¡Felicidades! Has ganado en {Math.floor(time / 60)}:
            {String(time % 60).padStart(2, "0")}
          </div>
        )}
        {status === "lost" && <div className="lost">Game Over. Has explotado una mina.</div>}
      </div>
    </div>
  );
}
