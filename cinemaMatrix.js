//1- Crea una función que inicialice una matriz de asientos (un arreglo bidimensional) que represente 8 filas y 10 columnas.
//2- Representa los asientos ocupados con un 1 y los disponibles con un 0.
function salaCine() {
    const matrix = [];
    for (let i = 0; i < 8; i++) {
        const row = [];
        for (let j = 0; j < 10; j++) {
            row.push(0); // Inicializa todos los asientos como disponibles (0)
        }
        matrix.push(row);
    }
    return matrix;
}
const salaCineAlpha = salaCine();
//Crea un función que muestre el estado actual de la sala imprimiendo la matriz en la consola usando: X para los asientos ocupados y L para los asientos disponibles. Incluye números de fila y columna para mayor claridad.
function mostrarSala(matrix) {
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
function reservarAsiento(matrix, fila, columna) {
    if (fila < 0 || fila >= matrix.length || columna < 0 || columna >= matrix[0].length) {
        return 'Asiento inválido';
    }
    if (matrix[fila][columna] === 1) {
        return 'El asiento ya está ocupado';
    }
    matrix[fila][columna] = 1;
    return 'Reserva exitosa';
}

export {};
