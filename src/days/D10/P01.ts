import { log } from 'console';
import { Utils } from '../../utils';

interface Pos {
    x: number;
    y: number;
}

export const solve = (input: string): string => {
    const grid = input.split('\n').map((l) => l.split(''));

    let startingPosition: Pos;
    grid.forEach((row, i) =>
        row.forEach((cell, j) => {
            if (cell == 'S') {
                startingPosition = {
                    x: j,
                    y: i,
                };
            }

            return;
        }),
    );

    const getNextPosition = (pos: Pos, previousPos: Pos): Pos => {
        const currEl = grid[currentPosition.y][currentPosition.x];

        if (currEl == '-' || currEl == 'J' || currEl == '7' || currEl == 'S') {
            // Check Left
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

        log('Fuck', currentPosition);
    };

    let previousPosition = startingPosition;
    let currentPosition = startingPosition;
    let steps = 0;
    while (true) {
        const nextPos = getNextPosition(currentPosition, previousPosition);
        const nextValue = grid[nextPos.y][nextPos.x];

        if (nextValue == 'S') {
            break;
        }

        previousPosition = currentPosition;
        currentPosition = nextPos;
        steps++;
    }

    const result = Math.ceil(steps / 2);
    return '' + result;
};
