import { colors } from './src/colors';
import { runSolver } from './src/runSolver';
import { VerifySetup } from './src/verifySetup';

const main = async () => {
    const day = 9;
    const part = 1;

    console.log(`Running${colors.yellow} Day ${day} Part ${part}${colors.default}`);
    const result = await runSolver(day, part);
    console.log(result);
};

console.clear();
VerifySetup();
main();
