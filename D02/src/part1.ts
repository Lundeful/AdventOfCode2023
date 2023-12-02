import { log } from 'console';
import fs from 'fs';
import { readFile, readLines } from '../src/helpers';

console.clear();
log('\n#################### Running program ####################');
const part = 'Part1';

const solve = (path: string): string => {
  // Start
  log('## Starting run ##');
  let lines = readLines(path);

  // Logic
  const sum = lines.map(getResultForGame).reduce((a, b) => a + b);

  // End
  log('## Run finished ##');
  return sum.toString();
};

const getResultForGame = (game: string): number => {
  const gameId = parseInt(game.split(':')[0].split(' ')[1]);
  const sets = game.split(':')[1].split(';');
  let isPossible = true;

  sets.forEach((set) => {
    const subSet = set.trim().split(',');
    subSet.forEach((subSet) => {
      const amount = parseInt(subSet.trim().split(' ')[0]);
      const color = subSet.trim().split(' ')[1];

      // log('Color: ' + color + '. Amount: ' + amount);
      const maxForColor = getMaxForColor(color);
      if (amount > maxForColor) {
        log(amount + ' is over max ' + maxForColor + ' for color ' + color + ' in game: ' + gameId);
        isPossible = false;
        return 0;
      }
    });
  });

  return isPossible ? gameId : 0;
};

const getMaxForColor = (color: string): number => {
  switch (color) {
    case 'red':
      return 12;
    case 'green':
      return 13;
    case 'blue':
      return 14;
    default:
      return 0;
  }
};

// Setup and run
var expectedResult = readFile(`./input/inputTestResult${part}.txt`);
var testResult = solve(`./input/inputTest${part}.txt`);
log(`[${expectedResult}] expectedResult`);
log(`[${testResult}] testResult`);

if (!!testResult && testResult == expectedResult) {
  log('## Test passed, running with real input ##');
  var outputPath = `./output/${part}.txt`;

  var results = solve('./input/input.txt');
  log(`[${results}] Final result`);

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
