import fs from 'fs';
import path from 'path';
import { colors } from './colors';

export const runSolver = async (day: number, part: number): Promise<string> => {
    const dayStr = `D${day.toString().padStart(2, '0')}`;
    const partStr = `P${part.toString().padStart(2, '0')}`;

    try {
        // Get solver
        const solverPath = `./days/${dayStr}/${partStr}`;
        const { solve }: ISolver = await import(solverPath);
        if (!solve) {
            throw new Error('Solver module does not export a solve function');
        }

        // Get test input
        const testInput = await getTestInput(dayStr, partStr);
        if (!testInput) {
            throw new Error('Missing test input');
        }

        // Get test solution
        const testSolution = await getTestSolution(dayStr, partStr);
        if (!testSolution) {
            throw new Error('Missing test solution');
        }

        // Solve for test input
        const testResult = solve(testInput);

        // Verify test results
        if (testResult != testSolution) {
            return (
                colors.red +
                'Test failed\n' +
                colors.default +
                `Expected: '${colors.yellow}${testSolution}${colors.default}'\n` +
                `Received: '${colors.yellow}${testResult}${colors.default}'`
            );
        } else {
            console.log(colors.green + 'Test passed. Running puzzle input\n' + colors.default);
        }

        // Get puzzle input
        const input = await getInput(dayStr);
        if (!input) {
            throw new Error('Missing real input');
        }

        // Solve for puzzle input
        const result = solve(input).trim();

        // Store and return result
        await upsertResult(dayStr, partStr, result);
        return `Result: '${colors.yellow}${result}${colors.default}'`;
    } catch (error) {
        console.error(colors.red + error + colors.default);
        return '';
    }
};

interface ISolver {
    solve: (input: string) => string;
}

const getInput = (dayStr: string): Promise<string> => {
    const filePath = path.join(__dirname, 'days', dayStr, 'input.txt');
    return fs.promises.readFile(filePath, 'utf-8');
};

const getTestInput = (dayStr: string, partStr: string): Promise<string> => {
    const filePath = path.join(__dirname, 'days', dayStr, `${partStr}-TestInput.txt`);
    return fs.promises.readFile(filePath, 'utf-8');
};

const getTestSolution = (dayStr: string, partStr: string): Promise<string> => {
    const filePath = path.join(__dirname, 'days', dayStr, `${partStr}-TestSolution.txt`);
    return fs.promises.readFile(filePath, 'utf-8');
};

const upsertResult = async (dayStr: string, partStr: string, result: string): Promise<void> => {
    if (!result) return;

    const filePath = path.join(__dirname, 'days', dayStr, `${partStr}-Output.txt`);
    var previousResults = await fs.promises.readFile(filePath, 'utf-8');

    if (previousResults.split('\n').some((oldResult) => oldResult == result)) {
        console.log('Result already recorded');
    } else {
        console.log('New result, storing to file');
        await fs.promises.appendFile(filePath, result + '\n');
    }
};
