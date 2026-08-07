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
mostrarSala(salaCineAlpha);