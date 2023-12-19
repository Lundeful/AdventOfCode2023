import { log } from 'console';
import { Utils } from '../../utils';

interface Pos {
    x: number;
    y: number;
}

interface MPos extends Pos {
    isLeft: boolean;
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

    let previousPosition = startingPosition;
    let currentPosition = startingPosition;
    let steps = 0;

    let leftNodes: Pos[] = [];
    let rightNodes: Pos[] = [];

    const loopParts = getLoopParts(grid, startingPosition);

    while (true) {
        const currentValue = grid[currentPosition.y][currentPosition.x];
        const horDelta = currentPosition.x - previousPosition.x;
        const verDelta = currentPosition.y - previousPosition.y;

        if (currentValue == '|') {
            const goingUp = currentPosition.y < previousPosition.y;
            leftNodes.push({ x: currentPosition.x - (goingUp ? -1 : 1), y: currentPosition.y });
            rightNodes.push({ x: currentPosition.x + (goingUp ? 1 : -1), y: currentPosition.y });
        } else if (currentValue == '-') {
            const goingRight = currentPosition.x > previousPosition.x;
            leftNodes.push({ x: currentPosition.y, y: currentPosition.y - (goingRight ? -1 : 1) });
            rightNodes.push({ x: currentPosition.x, y: currentPosition.y - (goingRight ? 1 : -1) });
        }

        const nextPos = getNextPosition(grid, currentPosition, previousPosition);
        const nextValue = grid[nextPos.y][nextPos.x];

        if (nextValue == 'S') {
            break;
        }

        previousPosition = currentPosition;
        currentPosition = nextPos;
        steps++;
    }

    leftNodes = leftNodes.filter((p) => !loopParts.some((p2) => p.x == p2.x && p.y == p2.y));
    rightNodes = rightNodes.filter((p) => !loopParts.some((p2) => p.x == p2.x && p.y == p2.y));

    log(leftNodes);
    log(rightNodes);

    const result = Math.ceil(steps / 2);
    return '';
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
