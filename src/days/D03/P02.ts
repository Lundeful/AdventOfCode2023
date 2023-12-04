import { log } from 'console';
import { Utils } from '../../utils';

// Please don't read this code lol it got way too long and complicated
export const solve = (input: string): string => {
    const grid = input.split('\n').map((row) => row.split(''));

    // Get numbers
    const numbers = getNumbersWithCoordinates(grid);

    // Store valid gears
    let gears: { x: number; y: number }[] = [];
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

    const alreadyVisitedNumbers: number[] = [];

    // Find relevant numbers for gear
    gears.forEach((gear) => {
        numbers.forEach((number) => {});
    });

    return '' + totalRatio;
};

interface Coordinate {
    id: number;
    y: number;
    x: number;
    value: string;
}

const getNumbersWithCoordinates = (grid: string[][]): Coordinate[] => {
    var numbers: Coordinate[] = [];
    var id = 1;

    for (let i = 0; i < grid.length; i++) {
        let startingIndex: number | null = null;
        let currentNumber = '';

        const row = grid[i];
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            if (isNumber(cell)) {
                if (startingIndex == null) {
                    startingIndex = j;
                }

                currentNumber += cell;
            } else {
                if (startingIndex != null) {
                    numbers.push({
                        id: id++,
                        y: i,
                        x: startingIndex,
                        value: currentNumber,
                    });

                    startingIndex = null;
                    currentNumber = '';
                }
            }
        }

        if (startingIndex != null) {
            numbers.push({
                id: id++,
                y: i,
                x: startingIndex,
                value: currentNumber,
            });
        }
    }

    return numbers;
};

const getNumberCoordinatesForGear = (grid: string[][], i: number, j: number) => {
    const topLeft = getGridValue(grid, i - 1, j - 1);
    const topMiddle = getGridValue(grid, i - 1, j);
    const topRight = getGridValue(grid, i - 1, j + 1);

    const left = getGridValue(grid, i, j - 1);
    const right = getGridValue(grid, i, j + 1);

    const bottomLeft = getGridValue(grid, i + 1, j - 1);
    const bottomMiddle = getGridValue(grid, i + 1, j);
    const bottomRight = getGridValue(grid, i + 1, j + 1);

    let adjacentNumbers = 0;
    let numbersForGear: { x: number; y: number }[] = [];

    // Check top
    if (isNumber(topLeft) && isNumber(topMiddle) && isNumber(topRight)) {
        // One large number on top
        adjacentNumbers++;
        numbersForGear.push({ y: i - 1, x: j - 1 });
    } else if (isNumber(topLeft) && !isNumber(topMiddle) && isNumber(topRight)) {
        // Numbers top left and top right
        adjacentNumbers += 2;
        numbersForGear.push({ y: i - 1, x: j - 1 });
        numbersForGear.push({ y: i - 1, x: j + 1 });
    } else if (isNumber(topLeft) && !isNumber(topMiddle) && !isNumber(topRight)) {
        // Number top left
        adjacentNumbers++;
        numbersForGear.push({ y: i - 1, x: j - 1 });
    } else if (!isNumber(topLeft) && !isNumber(topMiddle) && isNumber(topRight)) {
        // Number top right
        adjacentNumbers++;
        numbersForGear.push({ y: i - 1, x: j + 1 });
    } else if (isNumber(topLeft) && isNumber(topMiddle) && !isNumber(topRight)) {
        // Number from top left to middle
        adjacentNumbers++;
        numbersForGear.push({ y: i - 1, x: j - 1 });
    } else if (!isNumber(topLeft) && isNumber(topMiddle) && isNumber(topRight)) {
        // Number from top right to middle
        adjacentNumbers++;
        numbersForGear.push({ y: i - 1, x: j + 1 });
    }

    // Check left
    if (isNumber(left)) {
        adjacentNumbers++;
        numbersForGear.push({ y: i, x: j - 1 });
    }

    if (isNumber(right)) {
        adjacentNumbers++;
        numbersForGear.push({ y: i, x: j + 1 });
    }

    // Check bottom
    if (isNumber(bottomLeft) && isNumber(bottomMiddle) && isNumber(bottomRight)) {
        // One long number bottom
        adjacentNumbers++;
        numbersForGear.push({ y: i + 1, x: j - 1 });
    } else if (isNumber(bottomLeft) && !isNumber(bottomMiddle) && isNumber(bottomRight)) {
        // Numbers left and right bottom
        adjacentNumbers += 2;
        numbersForGear.push({ y: i + 1, x: j - 1 });
        numbersForGear.push({ y: i + 1, x: j + 1 });
    } else if (isNumber(bottomLeft) && !isNumber(bottomMiddle) && !isNumber(bottomRight)) {
        // Number bottom left
        adjacentNumbers++;
        numbersForGear.push({ y: i + 1, x: j - 1 });
    } else if (!isNumber(bottomLeft) && !isNumber(bottomMiddle) && isNumber(bottomRight)) {
        // Number bottom right
        adjacentNumbers++;
        numbersForGear.push({ y: i + 1, x: j + 1 });
    } else if (isNumber(bottomLeft) && isNumber(bottomMiddle) && !isNumber(bottomRight)) {
        // Number from bottom left to middle
        adjacentNumbers++;
        numbersForGear.push({ y: i + 1, x: j - 1 });
    } else if (!isNumber(bottomLeft) && isNumber(bottomMiddle) && isNumber(bottomRight)) {
        // Number from bottom right to middle
        adjacentNumbers++;
        numbersForGear.push({ y: i + 1, x: j + 1 });
    }

    return numbersForGear;
};

const getNumberForCoordinate = (grid: string[][], i: number, j: number) => {
    let number = '';

    // Check left
    let index = j;
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

    return parseInt(number);
};
const getGridValue = (grid: string[][], i: number, j: number): string => {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) return '.';

    return grid[i][j];
};

const isNumber = (str: string) => /^\d+$/.test(str);
