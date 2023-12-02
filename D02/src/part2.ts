import { log } from 'console';
import fs from 'fs';
import { readFile, readLines } from '../src/helpers';

console.clear();
log('\n#################### Running program ####################');
const part = 'Part2';

const solve = (path: string): any => {
  // Start
  log('## Starting run for ' + part + ' ##');
  let lines = readLines(path);

  // Logic
  const results = lines.map(getResultForGame).reduce((a, b) => a + b);

  // End
  log('## Run finished ##');
  return results;
};

const getResultForGame = (game: string) => {
  const gameId = parseInt(game.split(':')[0].split(' ')[1]);
  const sets = game.split(':')[1].split(';');
  var minRed = 0;
  var minGreen = 0;
  var minBlue = 0;

  sets.forEach((set) => {
    const subSet = set.trim().split(',');
    subSet.forEach((subSet) => {
      const amount = parseInt(subSet.trim().split(' ')[0]);
      const color = subSet.trim().split(' ')[1];

      switch (color) {
        case 'red':
          minRed = Math.max(minRed, amount);
          break;
        case 'green':
          minGreen = Math.max(minGreen, amount);
          break;
        case 'blue':
          minBlue = Math.max(minBlue, amount);
          break;
        default:
          break;
      }
    });
  });

  const power = minRed * minBlue * minGreen;
  return power;
};

// Setup and run
var expectedResult = readFile(`./input/inputTestResult${part}.txt`);
var testResult = solve(`./input/inputTest${part}.txt`);
log('Test vs expected');
log(expectedResult);
log(testResult);

if (!!testResult && testResult == expectedResult) {
  log('## Test passed, running with real input ##');
  var outputPath = `./output/${part}.txt`;

  var results = solve('./input/input.txt');
  log('Final results');
  log(results);

  // Compare results
  var previousResults = readLines(outputPath);
  if (previousResults.some((oldResult) => oldResult == results)) {
    log('Result already recorded');
  } else {
    log('New result, storing to file');
    fs.appendFileSync(outputPath, results + '\n');
  }
} else {
  log('## Test failed ##');
}
