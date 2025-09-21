export type CellState = "hidden" | "revealed" | "flagged";

export interface Cell {
  id: string;           
  row: number;
  col: number;
  isMine: boolean;
  adjacentMines: number;
  state: CellState;
}
