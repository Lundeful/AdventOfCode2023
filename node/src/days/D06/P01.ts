import { Utils } from '../../utils';

export const solve = (input: string): string => {
    const lines = input.split('\n');

    const times = lines[0]
        .split(':')[1]
        .trim()
        .split(/\s+/)
        .map((t) => parseInt(t));

    const distances = lines[1]
        .split(':')[1]
        .trim()
        .split(/\s+/)
        .map((t) => parseInt(t));

    const races = times.map((t, i) => ({ time: t, distance: distances[i] }));

    const results = races
        .map((r) => {
            let winAmount = 0;
            for (let holdTime = 0; holdTime < r.time; holdTime++) {
                let timeRemaining = r.time - holdTime;
                const speed = holdTime;
                if (speed * timeRemaining > r.distance) {
                    winAmount++;
                }
            }
            return winAmount;
        })
        .reduce(Utils.Reducers.multiply);

    return '' + results;
};
