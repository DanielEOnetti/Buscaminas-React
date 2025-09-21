import React from "react";
import Cell from "./Cell";
import type { Cell as CellType } from "../types";

// Definición de las props que recibe el componente Board
type Props = {
  board: CellType[][]; // Matriz que representa el tablero de celdas
  onLeftClick: (r: number, c: number) => void; // Función al hacer click izquierdo en una celda
  onRightClick: (e: React.MouseEvent, r: number, c: number) => void; // Función al hacer click derecho en una celda
};

// Componente que renderiza todo el tablero
export default function Board({ board, onLeftClick, onRightClick }: Props) {
  return (
    // Contenedor principal del tablero
    <div style={{ display: "inline-block", padding: 8 }}>
      {board.map((row, rIdx) => (
        // Renderiza cada fila como un flex row
        <div key={rIdx} style={{ display: "flex" }}>
          {row.map((cell) => (
            // Renderiza cada celda usando el componente Cell
            <Cell
              key={cell.id}
              cell={cell}
              onLeftClick={onLeftClick}
              onRightClick={onRightClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
