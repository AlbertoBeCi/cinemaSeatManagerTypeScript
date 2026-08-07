//1- Crea una función que inicialice una matriz de asientos (un arreglo bidimensional) que represente 8 filas y 10 columnas.
//2- Representa los asientos ocupados con un 1 y los disponibles con un 0.

export {};

function salaCine(): (0 | 1)[][] {
    const matrix: (0 | 1)[][] = [];
    for (let i = 0; i < 8; i++) {
        const row: (0 | 1)[] = [];
        for (let j = 0; j < 10; j++) {
            row.push(0); // Inicializa todos los asientos como disponibles (0)
        }
        matrix.push(row);
    }
    return matrix;
}

const salaCineAlpha = salaCine();

//Crea un función que muestre el estado actual de la sala imprimiendo la matriz en la consola usando: X para los asientos ocupados y L para los asientos disponibles. Incluye números de fila y columna para mayor claridad.
function mostrarSala(matrix: (0 | 1)[][]): void {
    // Imprime los números de columna
    let header = '  ';
    for (let j = 0; j < matrix[0].length; j++) {
        header += j + ' ';
    }
    console.log(header);

    for (let i = 0; i < matrix.length; i++) {
        let rowString = i + '  ';
        for (const seat of matrix[i]) {
            rowString += seat === 1 ? 'X ' : 'L ';
        }
        console.log(rowString);
    }
}
console.log("Estado inicial de la sala:");
mostrarSala(salaCineAlpha);

//Implementa una función que permita reservar un asiento específico dado su número de fila y columna. La función debe verificar si el asiento está disponible antes de marcarlo como ocupado y devolver un mensaje indicando si la reserva fue exitosa o si el asiento ya estaba ocupado.
function reservarAsiento(matrix: (0 | 1)[][], fila: number, columna: number): string {
    if (fila < 0 || fila >= matrix.length || columna < 0 || columna >= matrix[0].length) {
        return 'Asiento inválido';
    }
    if (matrix[fila][columna] === 1) {
        return 'El asiento ya está ocupado';
    }
    matrix[fila][columna] = 1;
    return 'Reserva exitosa';
}
console.log("Intentando reservar el asiento en la fila 2, columna 3:");
console.log(reservarAsiento(salaCineAlpha, 2, 3));
mostrarSala(salaCineAlpha);

//Crear una funcion que cuente el número de asientos ocupados y disponibles en la sala.
function contarAsientos(matrix: (0 | 1)[][]): { ocupados: number; disponibles: number } {
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
console.log("Conteo de asientos:");
console.log(contarAsientos(salaCineAlpha));

mostrarSala(salaCineAlpha);

//Implementa una función que busque dos asientos libres contiguos en la misma fila y devuelva sus posiciones. Si se encuenta varios pares consecutivos, devuelve el primero que encuentre. Si no hay asientos libres contiguos, devuelve un mensaje indicando que no se encontraron.
function buscarAsientosContiguos(matrix: (0 | 1)[][]): { fila: number; columna1: number; columna2: number } | string {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length - 1; j++) {
            if (matrix[i][j] === 0 && matrix[i][j + 1] === 0) {
                return { fila: i, columna1: j, columna2: j + 1 };
            }
        }
    }
    return 'No se encontraron asientos contiguos libres';
}

console.log("Buscando asientos contiguos libres:");
console.log(buscarAsientosContiguos(salaCineAlpha));