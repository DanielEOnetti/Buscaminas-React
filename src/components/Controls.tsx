// Props que recibe el componente de controles
type Props = {
  rows: number; // Número de filas del tablero
  cols: number; // Número de columnas del tablero
  mines: number; // Número de minas en el tablero
  onChangeSettings: (rows: number, cols: number, mines: number) => void; // Función para actualizar el tamaño/minas
  onReset: () => void; // Función para reiniciar o empezar el juego
  time: number; // Tiempo transcurrido en segundos
  bestTime?: number | null; // Mejor tiempo registrado
  playing: boolean; // Estado de juego activo o no
};

// Componente que permite ajustar las configuraciones del tablero y ver el tiempo
export default function Controls({
  rows, cols, mines, onChangeSettings, onReset, time, bestTime, playing
}: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      {/* Inputs para modificar filas, columnas y minas */}
      <label>
        Filas:
        <input
          type="number"
          value={rows}
          min={5}
          max={40}
          onChange={(e) => onChangeSettings(Number(e.target.value), cols, mines)}
        />
      </label>

      <label style={{ marginLeft: 8 }}>
        Columnas:
        <input
          type="number"
          value={cols}
          min={5}
          max={40}
          onChange={(e) => onChangeSettings(rows, Number(e.target.value), mines)}
        />
      </label>

      <label style={{ marginLeft: 8 }}>
        Minas:
        <input
          type="number"
          value={mines}
          min={1}
          max={rows * cols - 1} // Evita poner más minas que celdas disponibles
          onChange={(e) => onChangeSettings(rows, cols, Number(e.target.value))}
        />
      </label>

      {/* Botón para reiniciar o empezar el juego según el estado */}
      <button onClick={onReset} style={{ marginLeft: 8 }}>
        {playing ? "Reiniciar" : "Empezar"}
      </button>

      {/* Muestra tiempo transcurrido y mejor tiempo */}
      <div style={{ display: "inline-block", marginLeft: 16 }}>
        Tiempo: {formatTime(time)} 
        <span style={{ marginLeft: 8 }}>
          Mejor: {bestTime != null ? formatTime(bestTime) : "--:--"}
        </span>
      </div>
    </div>
  );
}

// Función auxiliar para formatear segundos en mm:ss
function formatTime(sec: number) {
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
