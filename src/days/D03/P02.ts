import { log } from 'console';
import { Utils } from '../../utils';

// Please don't read this code lol it got way too long and complicated
export const solve = (input: string): string => {
    const grid = input.split('\n').map((row) => row.split(''));

    let totalRatio = 0;
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        for (let j = 0; j < row.length; j++) {
            let element = row[j];
            if (element == '*') {
                const numberCoords = getNumberCoordinatesForGear(grid, i, j);
                if (numberCoords.length == 2) {
                    const numbers = numberCoords.map((n) => getNumberForCoordinate(grid, n.y, n.x));
                    const gearRatio = numbers.reduce(Utils.Reducers.multiply);
                    totalRatio += gearRatio;
                }
            }
        }
    }

    return '' + totalRatio;
};

const getNumberCoordinatesForGear = (grid: string[][], i: number, j: number) => {
    // Check for nearby numbers
    const topLeft = isNumber(getGridValue(grid, i - 1, j - 1));
    const topMiddle = isNumber(getGridValue(grid, i - 1, j));
    const topRight = isNumber(getGridValue(grid, i - 1, j + 1));

    const left = isNumber(getGridValue(grid, i, j - 1));
    const right = isNumber(getGridValue(grid, i, j + 1));

    const bottomLeft = isNumber(getGridValue(grid, i + 1, j - 1));
    const bottomMiddle = isNumber(getGridValue(grid, i + 1, j));
    const bottomRight = isNumber(getGridValue(grid, i + 1, j + 1));

    let coordinates: { x: number; y: number }[] = [];

    // Check top
    if (topLeft && topMiddle && topRight) {
        // One large number on top
        coordinates.push({ y: i - 1, x: j - 1 });
    } else if (topLeft && !topMiddle && topRight) {
        // Numbers top left and top right
        coordinates.push({ y: i - 1, x: j - 1 });
        coordinates.push({ y: i - 1, x: j + 1 });
    } else if (topLeft && !topMiddle && !topRight) {
        // Number top left
        coordinates.push({ y: i - 1, x: j - 1 });
    } else if (!topLeft && !topMiddle && topRight) {
        // Number top right
        coordinates.push({ y: i - 1, x: j + 1 });
    } else if (topLeft && topMiddle && !topRight) {
        // Number from top left to middle
        coordinates.push({ y: i - 1, x: j - 1 });
    } else if (!topLeft && topMiddle && topRight) {
        // Number from top right to middle
        coordinates.push({ y: i - 1, x: j + 1 });
    }

    // Check left
    if (left) {
        coordinates.push({ y: i, x: j - 1 });
    }

    // Check right
    if (right) {
        coordinates.push({ y: i, x: j + 1 });
    }

    // Check bottom
    if (bottomLeft && bottomMiddle && bottomRight) {
        // One long number bottom
        coordinates.push({ y: i + 1, x: j - 1 });
    } else if (bottomLeft && !bottomMiddle && bottomRight) {
        // Numbers left and right bottom
        coordinates.push({ y: i + 1, x: j - 1 });
        coordinates.push({ y: i + 1, x: j + 1 });
    } else if (bottomLeft && !bottomMiddle && !bottomRight) {
        // Number bottom left
        coordinates.push({ y: i + 1, x: j - 1 });
    } else if (!bottomLeft && !bottomMiddle && bottomRight) {
        // Number bottom right
        coordinates.push({ y: i + 1, x: j + 1 });
    } else if (bottomLeft && bottomMiddle && !bottomRight) {
        // Number from bottom left to middle
        coordinates.push({ y: i + 1, x: j - 1 });
    } else if (!bottomLeft && bottomMiddle && bottomRight) {
        // Number from bottom right to middle
        coordinates.push({ y: i + 1, x: j + 1 });
    }

    return coordinates;
};

const getNumberForCoordinate = (grid: string[][], i: number, j: number) => {
    let number = grid[i][j];

    if (!isNumber(number)) throw new Error('This function is only for NUMBERS');

    // Check left
    let index = j - 1;
    while (isNumber(getGridValue(grid, i, index))) {
        number = getGridValue(grid, i, index) + number;
        index--;
    }

    // Check right
    index = j + 1;
    while (isNumber(getGridValue(grid, i, index))) {
        number = number + getGridValue(grid, i, index);
        index++;
    }

    log(number);

    return parseInt(number);
};
const getGridValue = (grid: string[][], i: number, j: number): string => {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) return '.';

    return grid[i][j];
};

const isNumber = (str: string) => /^\d+$/.test(str);
