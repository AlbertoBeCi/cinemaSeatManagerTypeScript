export type Asiento = 0 | 1;
export type Sala = Asiento[][];

export const FILAS = 8;
export const COLUMNAS = 10;

export function salaCine(probabilidadOcupado: number = 0.3): Sala {
    const matrix: Sala = [];
    for (let i = 0; i < FILAS; i++) {
        const row: Asiento[] = [];
        for (let j = 0; j < COLUMNAS; j++) {
            row.push(Math.random() < probabilidadOcupado ? 1 : 0);
        }
        matrix.push(row);
    }
    return matrix;
}

export function reservarAsiento(matrix: Sala, fila: number, columna: number): string {
    if (fila < 0 || fila >= matrix.length || columna < 0 || columna >= matrix[0].length) {
        return 'Asiento inválido';
    }
    if (matrix[fila][columna] === 1) {
        return 'El asiento ya está ocupado';
    }
    matrix[fila][columna] = 1;
    return 'Reserva exitosa';
}

export function contarAsientos(matrix: Sala): { ocupados: number; disponibles: number } {
    let ocupados = 0;
    let disponibles = 0;
    for (const row of matrix) {
        for (const seat of row) {
            if (seat === 1) {
                ocupados++;
            } else {
                disponibles++;
            }
        }
    }
    return { ocupados, disponibles };
}

export function buscarAsientosContiguos(matrix: Sala): { fila: number; columna1: number; columna2: number } | string {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length - 1; j++) {
            if (matrix[i][j] === 0 && matrix[i][j + 1] === 0) {
                return { fila: i, columna1: j, columna2: j + 1 };
            }
        }
    }
    return 'No se encontraron asientos contiguos libres';
}
