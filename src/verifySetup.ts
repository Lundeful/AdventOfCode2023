import fs from 'fs';
import path from 'path';
import { colors } from './colors';

export const VerifySetup = () => {
    console.log('Verifying setup');

    // Set root folder for solvers
    const daysPath = path.join(__dirname, 'days');
    upsertFolder(daysPath);

    // Setup each day
    for (let day = 1; day <= 25; day++) {
        const dayFolder = `D${day.toString().padStart(2, '0')}`;
        const dayFolderPath = path.join(__dirname, 'days', dayFolder);

        // Upsert directory
        upsertFolder(dayFolderPath);

        // Upsert solvers
        const part1Path = path.join(dayFolderPath, 'P01.ts');
        const part2Path = path.join(dayFolderPath, 'P02.ts');
        upsertSolver(part1Path);
        upsertSolver(part2Path);

        // Upsert input and output paths
        const testFilePaths = [
            path.join(dayFolderPath, 'input.txt'),
            path.join(dayFolderPath, 'P01-TestInput.txt'),
            path.join(dayFolderPath, 'P02-TestInput.txt'),
            path.join(dayFolderPath, 'P01-TestSolution.txt'),
            path.join(dayFolderPath, 'P02-TestSolution.txt'),
            path.join(dayFolderPath, 'P01-Output.txt'),
            path.join(dayFolderPath, 'P02-Output.txt'),
        ];
        testFilePaths.forEach(upsertFile);
    }

    console.log(colors.green + 'Setup verified' + colors.default);
};

const upsertFolder = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
};

const upsertFile = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '');
    }
};

const upsertSolver = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, solverTemplate);
    } else {
        const existingContent = fs.readFileSync(path).toString();
        if (!existingContent.includes(solverSignature)) {
            fs.writeFileSync(path, solverTemplate + '/* ' + existingContent + '*/');
        }
    }
};

const solverTemplate = `import { Utils } from '../../utils';

export const solve = (input: string): string => {
    return 'Not implemented';
};
`;

const solverSignature = 'export const solve = (input: string): string => {';
