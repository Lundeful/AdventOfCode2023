import { log } from 'console';
import { Utils } from '../../utils';

interface Star {
    number: number;
    row: number;
    col: number;
}

export const solve = (input: string): string => {
    const originalGrid = input.split('\n').map((l) => l.split(''));
    const originalStarPositions: Star[] = [];
    let starNumber = 1;
    originalGrid.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell == '#') {
                originalGrid[i][j] = starNumber.toString();
                originalStarPositions.push({
                    row: i,
                    col: j,
                    number: starNumber++,
                });
            }
        });
    });

    const emptyRows: number[] = [];
    const emptyCols: number[] = [];

    // Find empty rows
    for (let i = 0; i < originalGrid.length; i++) {
        const rowIsEmpty = !originalStarPositions.some((s) => s.row == i);
        if (rowIsEmpty) emptyRows.push(i);
    }

    // Find empty columns
    for (let i = 0; i < originalGrid[1].length; i++) {
        const columnIsEmpty = !originalStarPositions.some((s) => s.col == i);
        if (columnIsEmpty) emptyCols.push(i);
    }

    // Expand grid
    const columnLength = originalGrid[0].length + emptyCols.length;
    const grid: string[][] = []; // Expanded grid
    let num = 0;
    for (let i = 0; i < originalGrid.length; i++) {
        let row = originalGrid[i];
        for (let j = 0; j < originalGrid[0].length; j++) {
            if (emptyCols.some((n) => n == j)) {
                const beforeRow = row.slice(0, j + num + 1);
                const afterRow = row.slice(j + num + 1);
                row = [...beforeRow, '*', ...afterRow];

                if (j == 0) {
                    num++;
                }
            }
        }
        grid.push(row);
        if (emptyRows.some((n) => n == i)) {
            const newRow = Array<string>(columnLength).fill('.');
            grid.push(newRow);
        }
    }

    originalGrid.forEach((l) => console.log(l.join('')));
    grid.forEach((l) => console.log(l.join('')));

    const starPositions: Star[] = [];
    grid.forEach((row, i) => {
        row.forEach((cell, j) => {
            const number = parseInt(cell);
            if (number) {
                starPositions.push({
                    row: i,
                    col: j,
                    number: number,
                });
            }
        });
    });

    log(starPositions);

    // Find distances between pairs
    let totalSteps = 0;
    let pairs = 0;
    starPositions.forEach((s1, i) => {
        starPositions.forEach((s2, j) => {
            if (j > i) {
                pairs++;
                const xDiff = Math.abs(s1.col - s2.col);
                const yDiff = Math.abs(s1.row - s2.row);
                const totalForPair = xDiff + yDiff;
                // log('Pair', s1.number, s2.number, 'shortest:', totalForPair);
                totalSteps += totalForPair;
            }
        });
    });

    log('Pairs', pairs);
    return '' + totalSteps;
};
