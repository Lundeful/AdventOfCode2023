import { colors } from './src/colors';
import { runSolver } from './src/runSolver';
import { VerifySetup } from './src/verifySetup';

const main = async () => {
    const day = 5;
    const part = 2;

    console.log(`Running${colors.yellow} Day ${day} Part ${part}${colors.default}`);
    const result = await runSolver(day, part);
    console.log(result);
};

console.clear();
VerifySetup();
main();
