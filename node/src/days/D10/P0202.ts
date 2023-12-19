import { log } from 'console';
import { Utils } from '../../utils';

interface Pos {
    x: number;
    y: number;
}

export const solve = (input: string): string => {
    const oldGrid = input.split('\n').map((l) => l.split(''));


    const grid: string[][] = [];

    oldGrid.forEach((row, i) => {
        newRow
    })


    const startingPosition = getStartingPosition(grid);
    const loopParts = getLoopParts(grid, startingPosition);

    // Limit scale of search a little bit at least
    const minXPos = Math.min(...loopParts.map((pos) => pos.x));
    const minYPos = Math.min(...loopParts.map((pos) => pos.y));
    const maxXPos = Math.max(...loopParts.map((pos) => pos.x));
    const maxYPos = Math.max(...loopParts.map((pos) => pos.y));

    let outsideNodes: Pos[] = [];

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (loopParts.some((p) => p.x == colIndex && p.y == rowIndex)) continue; // Skip loop parts

            const outsideOfGrid =
                rowIndex < minYPos ||
                rowIndex > maxYPos ||
                colIndex < minXPos ||
                colIndex > maxXPos ||
                rowIndex == 0 ||
                colIndex == 0 ||
                colIndex == row.length - 1 ||
                rowIndex == grid.length - 1;

            const isTouchingOutsideNode = outsideNodes.some(
                (n) =>
                    (n.x == colIndex && n.y == rowIndex - 1) ||
                    (n.x == colIndex && n.y == rowIndex + 1) ||
                    (n.x == colIndex - 1 && n.y == rowIndex) ||
                    (n.x == colIndex + 1 && n.y == rowIndex),
            );

            if (outsideOfGrid || isTouchingOutsideNode) {
                log(colIndex, rowIndex);
                outsideNodes.push({
                    x: colIndex,
                    y: rowIndex,
                });
            }
        }
    }

    // for (let rowIndex = 0; minYPos <= maxYPos; rowIndex++) {
    //     for (let colIndex = minXPos; colIndex < maxXPos; colIndex++) {
    //         const el = grid[rowIndex][colIndex];
    //         const outsideOfGrid =
    //             rowIndex < minYPos ||
    //             rowIndex > maxYPos ||
    //             colIndex < minXPos ||
    //             colIndex > maxXPos ||
    //             rowIndex == 0 ||
    //             colIndex == 0 ||
    //             colIndex == grid[0].length - 1 ||
    //             rowIndex == grid.length - 1;

    //         if (el != '.') continue;
    //         if (outsideOfGrid) continue;

    //         const nearbyPositions = getNearbyPositions({ x: colIndex, y: rowIndex });
    //         const nearestPipe = nearbyPositions.find((p) => grid[p.y][p.x] !== '.');
    //         if (!nearestPipe) continue;

    //         log(grid[nearestPipe.y][nearestPipe.x]);

    //         let previousPosition = startingPosition;
    //         let currentPosition = startingPosition;
    //         let steps = 0;

    //         while (true) {
    //             const nextPos = getNextPosition(grid, currentPosition, previousPosition);
    //             const nextValue = grid[nextPos.y][nextPos.x];
    //             loopParts.push(currentPosition);

    //             if (nextValue == 'S') {
    //                 log('Reached S again. Total Steps:', steps);
    //                 break;
    //             }

    //             previousPosition = currentPosition;
    //             currentPosition = nextPos;
    //             steps++;
    //         }
    //     }
    // }

    log('Nodes', grid[0].length * grid.length - outsideNodes.length - loopParts.length);

    log(input);

    return '';
};

const getNearbyPositions = (pos: Pos): Pos[] => {
    const abovePos = { x: pos.x, y: pos.y - 1 };
    const belowPos = { x: pos.x, y: pos.y + 1 };
    const leftPos = { x: pos.x - 1, y: pos.y };
    const rightPos = { x: pos.x + 1, y: pos.y };
    return [abovePos, belowPos, rightPos, leftPos];
};

const getStartingPosition = (grid: string[][]): Pos => {
    let startingPosition: Pos;
    grid.forEach((row, i) =>
        row.forEach((cell, j) => {
            if (cell == 'S') {
                startingPosition = {
                    x: j,
                    y: i,
                };
            }
        }),
    );

    return startingPosition;
};

const getLoopParts = (grid: string[][], startingPosition: Pos): Pos[] => {
    const loopParts: Pos[] = [];

    let previousPosition = startingPosition;
    let currentPosition = startingPosition;
    let steps = 0;
    while (true) {
        const nextPos = getNextPosition(grid, currentPosition, previousPosition);
        const nextValue = grid[nextPos.y][nextPos.x];
        loopParts.push(currentPosition);

        if (nextValue == 'S') {
            log('Reached S again. Total Steps:', steps);
            break;
        }

        previousPosition = currentPosition;
        currentPosition = nextPos;
        steps++;
    }

    return loopParts;
};

const getNextPosition = (grid: string[][], pos: Pos, previousPos: Pos): Pos => {
    const currEl = grid[pos.y][pos.x];

    // Check Left
    if (currEl == '-' || currEl == 'J' || currEl == '7' || currEl == 'S') {
        const el = grid[pos.y][pos.x - 1];
        if (el == 'L' || el == 'F' || el == '-' || el == 'S') {
            const newPos = { x: pos.x - 1, y: pos.y };
            if (newPos.x !== previousPos.x || newPos.y !== previousPos.y) {
                return newPos;
            }
        }
    }

    // Check Right
    if (currEl == '-' || currEl == 'L' || currEl == 'F' || currEl == 'S') {
        const el = grid[pos.y][pos.x + 1];
        if (el == 'J' || el == '7' || el == '-' || el == 'S') {
            const newPos = { x: pos.x + 1, y: pos.y };
            if (newPos.x !== previousPos.x || newPos.y !== previousPos.y) {
                return newPos;
            }
        }
    }

    // Check Top
    if (currEl == '|' || currEl == 'J' || currEl == 'L' || currEl == 'S') {
        const el = grid[pos.y - 1][pos.x];
        if (el == '7' || el == 'F' || el == '|' || el == 'S') {
            const newPos = { x: pos.x, y: pos.y - 1 };
            if (newPos.x !== previousPos.x || newPos.y !== previousPos.y) {
                return newPos;
            }
        }
    }

    // Check Bottom
    if (currEl == '|' || currEl == '7' || currEl == 'F' || currEl == 'S') {
        const el = grid[pos.y + 1][pos.x];
        if (el == 'L' || el == 'J' || el == '|' || el == 'S') {
            const newPos = { x: pos.x, y: pos.y + 1 };
            if (newPos.x !== previousPos.x || newPos.y !== previousPos.y) {
                return newPos;
            }
        }
    }

    log('Fuck', pos);
};
