import React from "react";
import type { Cell as CellType } from "../types";

// Props que recibe el componente Cell
type Props = {
  cell: CellType; // Información de la celda individual
  onLeftClick: (r: number, c: number) => void; // Función al hacer click izquierdo
  onRightClick: (e: React.MouseEvent, r: number, c: number) => void; // Función al hacer click derecho
};

// Componente que representa una celda del tablero
export default function Cell({ cell, onLeftClick, onRightClick }: Props) {
  const { row, col, state, isMine, adjacentMines } = cell;

  // Variables para definir contenido y color de fondo según el estado
  let content: React.ReactNode = null;
  let bg = "#bbb"; // Color por defecto

  if (state === "revealed") {
    bg = "#e0e0e0"; // Fondo al revelar
    content = isMine ? "💣" : adjacentMines || null; // Mostrar mina o número de minas adyacentes
  } else if (state === "flagged") content = "🚩"; // Mostrar bandera si está marcada

  return (
    <div
      style={{
        width: 32,
        height: 32,
        border: "1px solid #999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none", // Evita selección de texto
        cursor: "pointer",
        backgroundColor: bg // Fondo según estado
      }}
      onClick={() => onLeftClick(row, col)} // Click izquierdo llama a la función pasada
      onContextMenu={e => { e.preventDefault(); onRightClick(e, row, col); }} // Click derecho llama a la función pasada
    >
      {content} {/* Renderiza mina, número o bandera */}
    </div>
  );
}
