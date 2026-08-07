import "./style.css";
import { salaCine, reservarAsiento, contarAsientos, buscarAsientosContiguos, COLUMNAS, type Sala } from "./cinema";

let sala: Sala = salaCine();

const mapaEl = document.querySelector<HTMLDivElement>("#mapa-asientos");
const mensajeEl = document.querySelector<HTMLParagraphElement>("#mensaje-estado");
const disponiblesEl = document.querySelector<HTMLElement>("#contador-disponibles");
const ocupadosEl = document.querySelector<HTMLElement>("#contador-ocupados");
const btnContiguos = document.querySelector<HTMLButtonElement>("#btn-contiguos");
const btnReiniciar = document.querySelector<HTMLButtonElement>("#btn-reiniciar");

function actualizarContadores(): void {
  const { ocupados, disponibles } = contarAsientos(sala);
  if (disponiblesEl) disponiblesEl.textContent = String(disponibles);
  if (ocupadosEl) ocupadosEl.textContent = String(ocupados);
}

function estiloAsiento(estado: Sala[number][number]): string {
  return estado === 1
    ? "bg-rose-500 text-white cursor-not-allowed"
    : "cursor-pointer border border-emerald-400 bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
}

function renderSala(): void {
  if (!mapaEl) return;
  mapaEl.innerHTML = "";
  mapaEl.style.gridTemplateColumns = `repeat(${COLUMNAS}, minmax(0, 1fr))`;

  sala.forEach((row, fila) => {
    row.forEach((estado, columna) => {
      const boton = document.createElement("button");
      boton.type = "button";
      boton.dataset.fila = String(fila);
      boton.dataset.columna = String(columna);
      boton.setAttribute("role", "gridcell");
      boton.setAttribute(
        "aria-label",
        `Fila ${fila + 1}, columna ${columna + 1}, ${estado === 1 ? "ocupado" : "libre"}`
      );
      boton.className = `flex h-8 w-8 items-center justify-center rounded text-xs font-semibold transition-colors ${estiloAsiento(estado)}`;
      boton.textContent = estado === 1 ? "X" : "";
      boton.addEventListener("click", () => manejarClicAsiento(fila, columna));
      mapaEl.appendChild(boton);
    });
  });
}

function manejarClicAsiento(fila: number, columna: number): void {
  const resultado = reservarAsiento(sala, fila, columna);
  if (mensajeEl) {
    mensajeEl.textContent = `Asiento fila ${fila + 1}, columna ${columna + 1}: ${resultado}`;
  }
  renderSala();
  actualizarContadores();
}

function resaltarAsientos(fila: number, columnas: number[]): void {
  columnas.forEach((columna) => {
    const boton = mapaEl?.querySelector<HTMLButtonElement>(
      `button[data-fila="${fila}"][data-columna="${columna}"]`
    );
    boton?.classList.add("ring-4", "ring-amber-400");
    setTimeout(() => boton?.classList.remove("ring-4", "ring-amber-400"), 1500);
  });
}

btnContiguos?.addEventListener("click", () => {
  const resultado = buscarAsientosContiguos(sala);
  if (typeof resultado === "string") {
    if (mensajeEl) mensajeEl.textContent = resultado;
    return;
  }
  const { fila, columna1, columna2 } = resultado;
  if (mensajeEl) {
    mensajeEl.textContent = `Asientos libres juntos: fila ${fila + 1}, columnas ${columna1 + 1} y ${columna2 + 1}`;
  }
  resaltarAsientos(fila, [columna1, columna2]);
});

btnReiniciar?.addEventListener("click", () => {
  sala = salaCine();
  if (mensajeEl) mensajeEl.textContent = "Se generó una nueva sala.";
  renderSala();
  actualizarContadores();
});

renderSala();
actualizarContadores();
