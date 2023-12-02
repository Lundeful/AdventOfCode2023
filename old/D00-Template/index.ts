import { log } from 'console';
import fs, { PathOrFileDescriptor } from 'fs';

console.clear();
log('\n#################### Running program ####################');

const run = (path: PathOrFileDescriptor): string => {
  log('## Starting run ##');
  const lines = fs.readFileSync(path).toString().split('\n');
  return '';
};

var testResult = run('./input/testInput.txt');
var expectedResult = fs.readFileSync('./input/testResult.txt').toString();
log('## Run finished ##');
log(`[${expectedResult}] expectedResult`);
log(`[${testResult}] testResult`);

if (!!testResult && testResult == expectedResult) {
  log('## Test passed, running with real input ##');
  var results = run('./input/input.txt');
  log(results);
} else {
  log('## Test failed ##');
}
