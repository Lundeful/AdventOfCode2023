import { log } from 'console';
import { Utils } from '../../utils';

export const solve = (input: string): string => {
    const lines = input.split('\n');
    const sum = lines
        .map((line) => line.split(' ').map((n) => parseInt(n)))
        .map((history) => getNextValueForHistory(history))
        .reduce(Utils.Reducers.add);

    return '' + sum;
};

const getNextValueForHistory = (numbers: number[]): number => {
    const grid = fillGrid(numbers);

    grid.forEach((line) => {
        line.push(0);
    });

    for (let i = grid.length - 1; i > 0; i--) {
        const currentRow = grid[i];
        const rowAbove = grid[i - 1];
        const currrentRowValue = currentRow[currentRow.length - 1];
        const topLeftValue = rowAbove[rowAbove.length - 2];
        rowAbove[rowAbove.length - 1] = topLeftValue + currrentRowValue;
    }

    const nextValue = grid[0][grid[0].length - 1];
    return nextValue;
};

const fillGrid = (numbers: number[]): number[][] => {
    const grid: number[][] = [numbers];

    let index = 0;
    while (grid[index].some((n) => n != 0)) {
        const previousArr = grid[index];
        const newArr = Array(grid[index].length - 1).fill(0);

        for (let j = 0; j < newArr.length; j++) {
            const nextValue = previousArr[j + 1] - previousArr[j];
            newArr[j] = nextValue;
        }

        grid.push(newArr);
        index++;
    }

    return grid;
};
