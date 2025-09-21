# Buscaminas (React + TypeScript)

Un clon del clásico juego **Buscaminas** implementado con **React**, **TypeScript** y almacenamiento local para los mejores tiempos.  

---

## 📂 Estructura del proyecto

src/
├─ components/
│ ├─ Board.tsx # Componente que renderiza el tablero
│ ├─ Cell.tsx # Componente que renderiza una celda individual
│ └─ Controls.tsx # Controles para cambiar filas, columnas, minas y resetear el juego
├─ utils/
│ └─ board.ts # Funciones para generar tablero, revelar celdas, alternar banderas y verificar victoria
├─ types.ts # Definición del tipo Cell
└─ App.tsx # Componente principal que maneja estado, timer y lógica del juego

---

## ⚙️ Funcionalidades

- **Tablero personalizable:** Cambia filas, columnas y número de minas.  
- **Click izquierdo:** Revela la celda. Si hay una mina, se revela todo y pierdes.  
- **Click derecho:** Coloca o quita una bandera en la celda.  
- **Revelado automático:** Si una celda no tiene minas adyacentes, se revelan automáticamente las celdas vecinas vacías.  
- **Estado del juego:** Se muestra mensaje de victoria o derrota.  
- **Timer:** Cronómetro que registra el tiempo de la partida.  
- **Mejor tiempo:** Almacena en `localStorage` el mejor tiempo para cada configuración de tablero.  

---

## 🧩 Tipos principales

```ts
type Cell = {
  id: string;
  row: number;
  col: number;
  isMine: boolean;
  adjacentMines: number;
  state: "hidden" | "revealed" | "flagged";
};

type Status = "idle" | "playing" | "won" | "lost";

📝 Uso

Cambia el número de filas, columnas y minas desde los controles.

Presiona Empezar para iniciar el juego o Reiniciar para reiniciar la partida.

Click izquierdo para revelar celdas.

Click derecho para poner o quitar banderas.

El mejor tiempo se mostrará automáticamente según la configuración del tablero.

🔧 Funciones principales (utils/board.ts)

generateBoard(rows, cols, mines): Crea un tablero con minas distribuidas aleatoriamente y calcula las minas adyacentes.

revealCell(board, row, col): Revela una celda; si es una mina, marca exploded = true. Revela celdas vacías recursivamente.

toggleFlag(board, row, col): Marca o desmarca una celda con bandera.

checkWin(board): Retorna true si todas las celdas no minadas están reveladas.

👀 Pantallas del juego

Inicio / idle: Tablero oculto y controles listos.

Jugando: Se actualiza timer y se pueden revelar celdas.

Ganado: Mensaje de victoria y mejor tiempo guardado.

Perdido: Todas las minas se revelan y mensaje de Game Over.

💡 Notas

El proyecto está desarrollado con React + TypeScript.

Se usa localStorage para guardar los mejores tiempos por configuración de tablero.

El diseño es básico y se puede mejorar con CSS o frameworks como Tailwind CSS.


📌 Autor

Daniel Echarri Onetti – Proyecto con fines educativos y de práctica de React + TypeScript.