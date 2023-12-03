import { log } from 'console';

export const solve = (input: string): string => {
    const grid = input.split('\n').map((row) => row.split(''));

    var totalSum = 0;
    input.split('\n').flatMap((row, i) => {
        let currentNumber = '';
        let isNextToSymbol = false;
        row.split('').map((cell, j) => {
            if (isNumber(cell)) {
                currentNumber += cell;

                if (elementIsNextToSymbol(grid, i, j)) {
                    isNextToSymbol = true;
                }

                if (j < row.length - 1) return;
            }

            if (isNextToSymbol) {
                totalSum += parseInt(currentNumber);
            }

            currentNumber = '';
            isNextToSymbol = false;
        });

        return;
    });

    return '' + totalSum;
};

const elementIsNextToSymbol = (grid: string[][], i: number, j: number): boolean => {
    const topLeft = getGridValue(grid, i - 1, j - 1);
    const topMiddle = getGridValue(grid, i - 1, j);
    const topRight = getGridValue(grid, i - 1, j + 1);

    const left = getGridValue(grid, i, j - 1);
    const right = getGridValue(grid, i, j + 1);

    const bottomLeft = getGridValue(grid, i + 1, j - 1);
    const bottomMiddle = getGridValue(grid, i + 1, j);
    const bottomRight = getGridValue(grid, i + 1, j + 1);

    const adjacentElements = [topLeft, topMiddle, topRight, left, right, bottomLeft, bottomMiddle, bottomRight];
    return adjacentElements.some(isSymbol);
};

const getGridValue = (grid: string[][], i: number, j: number): string => {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) return '.';

    return grid[i][j];
};

const isNumber = (str: string) => /^\d+$/.test(str);
const isDot = (str: string) => /./.test(str);
const isSymbol = (str: string) => /[^0-9.]/.test(str);
