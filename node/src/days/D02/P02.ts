import { Utils } from '../../utils';

export const solve = (input: string): string => {
    const lines = input.split('\n');
    const results = lines.map(getResultForGame).reduce(Utils.Reducers.add);

    return results.toString();
};

const getResultForGame = (game: string) => {
    const gameId = parseInt(game.split(':')[0].split(' ')[1]); // Used for debugging
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
