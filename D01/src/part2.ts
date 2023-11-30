import { log } from 'console';
import fs, { PathOrFileDescriptor } from 'fs';

console.clear();
log('\n#################### Running program ####################');
const part = 'Part2';

const run = (path: PathOrFileDescriptor): string => {
  // Start
  log('## Starting run ##');
  let input = fs.readFileSync(path).toString();

  // Logic
  const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  digits.forEach((digit, i) => {
    input = input.replaceAll(digit, digit + (i + 1).toString() + digit);
  });

  const lines = input.split('\n');
  var numbers = lines.map((line) => {
    var arr = line.split('').filter((char) => !isNaN(parseInt(char)));
    var number = arr[0] + arr[arr.length - 1];
    var parsed = parseInt(number);
    return parsed;
  });

  log(numbers);
  var result = numbers.reduce((a, b) => a + b).toString();

  // End
  log('## Run finished ##');
  return result;
};

var testResult = run(`./input/testInput${part}.txt`);
var expectedResult = fs.readFileSync(`./input/testResult${part}.txt`).toString();
log(`[${expectedResult}] expectedResult`);
log(`[${testResult}] testResult`);

if (!!testResult && testResult == expectedResult) {
  log('## Test passed, running with real input ##');
  var outputPath = `./output/${part}.txt`;

  var results = run('./input/input.txt');
  log(`[${results}] Final result`);

  // Compare results
  var previousResults = fs.readFileSync(outputPath).toString().split('\n');
  if (previousResults.some((oldResult) => oldResult == results)) {
    log('Result already recorded');
  } else {
    log('New result, storing to file');
    fs.appendFileSync(outputPath, results + '\n');
  }
} else {
  log('## Test failed ##');
}
