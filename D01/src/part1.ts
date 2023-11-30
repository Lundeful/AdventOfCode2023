import { log } from 'console';
import fs, { PathOrFileDescriptor } from 'fs';

console.clear();
log('\n#################### Running program ####################');

const run = (path: PathOrFileDescriptor): string => {
  // Start
  log('## Starting run ##');
  const lines = fs.readFileSync(path).toString().split('\n');

  // Logic
  var numbers = lines.map((line) => {
    var arr = line.split('').filter((char) => !isNaN(parseInt(char)));
    var number = arr[0] + arr[arr.length - 1];
    var parsed = parseInt(number);
    return parsed;
  });
  var result = numbers.reduce((a, b) => a + b).toString();
  // End
  log('## Run finished ##');
  return result;
};

var testResult = run('./input/testInput.txt');
var expectedResult = fs.readFileSync('./input/testResult.txt').toString();
log(`[${expectedResult}] expectedResult`);
log(`[${testResult}] testResult`);

if (!!testResult && testResult == expectedResult) {
  log('## Test passed, running with real input ##');
  var outputPath = './output/part1.txt';
  var results = run('./input/input.txt');
  log(`[${results}] Final result`);
  var previousResults = fs.readFileSync(outputPath).toString().split('\n');
  if (previousResults.some((oldResult) => oldResult == results)) {
    log('Result already recorded');
  } else {
    log('New result, storing to file');
    fs.appendFileSync(outputPath, results);
  }
} else {
  log('## Test failed ##');
}
