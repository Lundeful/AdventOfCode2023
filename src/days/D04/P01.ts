import { log } from 'console';
import { Utils } from '../../utils';

export const solve = (input: string): string => {
    const lines = input.split('\n');

    let points = 0;
    lines.forEach((line, i) => {
        const winningNumbers = line
            .split('|')[0]
            .split(':')[1]
            .split(' ')
            .filter((e) => e != '');

        const myNumbers = line
            .split('|')[1]
            .split(' ')
            .filter((e) => e != '');

        let numberOfMatches = 0;
        myNumbers.forEach((number) => {
            if (winningNumbers.some((wn) => wn == number)) {
                numberOfMatches++;
            }
        });

        points += Math.floor(Math.pow(2, numberOfMatches - 1));
    });

    return '' + points;
};
