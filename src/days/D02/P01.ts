import { Utils } from '../../utils';

export const solve = (input: string): string => {
    const lines = input.split('\n');
    const sum = lines.map(getResultForGame).reduce((a, b) => a + b);
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

            const maxForColor = getMaxForColor(color);
            if (amount > maxForColor) {
                isPossible = false;
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
