export const solve = (input: string): string => {
    const lines = input.split('\n');
    const time = parseInt(lines[0].split(':')[1].trim().split(/\s+/).join(''));
    const distance = parseInt(lines[1].split(':')[1].trim().split(/\s+/).join(''));

    let winAmount = 0;
    for (let holdTime = 0; holdTime < time; holdTime++) {
        let timeRemaining = time - holdTime;
        const speed = holdTime;
        if (speed * timeRemaining > distance) {
            winAmount++;
        }
    }

    return '' + winAmount;
};
