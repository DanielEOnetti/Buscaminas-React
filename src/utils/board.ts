import type { Cell } from "../types";

// Genera un tablero vacío y coloca minas aleatoriamente
export function generateBoard(rows: number, cols: number, mines: number): Cell[][] {
  const board: Cell[][] = [];
  let idCounter = 0;

  // Crear tablero con celdas inicializadas
  for (let r = 0; r < rows; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        id: `${idCounter++}`,
        row: r,
        col: c,
        isMine: false, // por defecto sin mina
        adjacentMines: 0, // minas adyacentes inicial 0
        state: "hidden", // estado inicial oculto
      });
    }
    board.push(row);
  }

  // Colocar minas aleatoriamente
  const positions = Array.from({ length: rows * cols }, (_, i) => i);
  for (let i = 0; i < mines; i++) {
    const idx = Math.floor(Math.random() * positions.length);
    const pos = positions.splice(idx, 1)[0];
    const r = Math.floor(pos / cols);
    const c = pos % cols;
    board[r][c].isMine = true;
  }

  // Calcular número de minas adyacentes para cada celda
  const dirs = [-1, 0, 1];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;
      let count = 0;
      dirs.forEach(dr => dirs.forEach(dc => {
        if (dr === 0 && dc === 0) return; // ignorar la celda central
        const rr = r + dr, cc = c + dc;
        if (rr >= 0 && rr < rows && cc >= 0 && cc < cols && board[rr][cc].isMine) count++;
      }));
      board[r][c].adjacentMines = count;
    }
  }

  return board;
}

// Revela una celda; si es una mina devuelve exploded = true
export function revealCell(board: Cell[][], row: number, col: number): { board: Cell[][]; exploded: boolean } {
  // Clonar tablero para mantener inmutabilidad
  const newBoard = board.map(r => r.map(c => ({ ...c })));
  const cell = newBoard[row][col];
  
  if (cell.state !== "hidden") return { board: newBoard, exploded: false }; // ya revelada
  if (cell.isMine) {
    // Revelar todas las minas si se hace click en una mina
    newBoard.forEach(r => r.forEach(c => { if (c.isMine) c.state = "revealed"; }));
    return { board: newBoard, exploded: true };
  }

  // Revelar celdas vacías recursivamente usando stack
  const stack: [number, number][] = [[row, col]];
  const dirs = [-1, 0, 1];
  while (stack.length) {
    const [r, c] = stack.pop()!;
    const current = newBoard[r][c];
    if (current.state === "revealed") continue;
    current.state = "revealed";
    if (current.adjacentMines === 0) {
      dirs.forEach(dr => dirs.forEach(dc => {
        if (dr === 0 && dc === 0) return;
        const rr = r + dr, cc = c + dc;
        if (rr >= 0 && rr < newBoard.length && cc >= 0 && cc < newBoard[0].length) {
          const neighbor = newBoard[rr][cc];
          if (neighbor.state === "hidden" && !neighbor.isMine) stack.push([rr, cc]);
        }
      }));
    }
  }

  return { board: newBoard, exploded: false };
}

// Alterna bandera en una celda
export function toggleFlag(board: Cell[][], row: number, col: number): Cell[][] {
  const newBoard = board.map(r => r.map(c => ({ ...c }))); // clonar tablero
  const cell = newBoard[row][col];
  if (cell.state === "hidden") cell.state = "flagged"; // marcar
  else if (cell.state === "flagged") cell.state = "hidden"; // desmarcar
  return newBoard;
}

// Comprueba si todas las celdas no minadas están reveladas
export function checkWin(board: Cell[][]): boolean {
  return board.every(row => row.every(c => c.isMine || c.state === "revealed"));
}
