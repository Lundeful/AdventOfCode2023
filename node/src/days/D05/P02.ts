export const solve = (input: string): string => {
    const lines = input.split('\n');

    const seedNumbers = lines[0]
        .split(':')[1]
        .trim()
        .split(' ')
        .map((s) => parseInt(s));

    const seeds: { start: number; amount: number; end: number }[] = [];
    for (let i = 0; i < seedNumbers.length; i += 2) {
        seeds.push({
            start: seedNumbers[i],
            amount: seedNumbers[i + 1],
            end: seedNumbers[i] + seedNumbers[i + 1] - 1,
        });
    }

    const mapIndices = lines.map((l, i) => (l.includes('map:') ? i : -1)).filter((n) => n != -1);
    const maps = mapIndices
        .map((mapIndex, i) =>
            lines
                .slice(mapIndex + 1, i + 1 < mapIndices.length ? mapIndices[i + 1] - 1 : undefined)
                .map((l) => l.split(' ').map((n) => parseInt(n)))
                .map((map) => {
                    const destination = map[0];
                    const source = map[1];
                    const amount = map[2];

                    return {
                        destination,
                        source: source,
                        amount: amount,
                    };
                }),
        )
        .reverse();

    let currentNumber = 0;
    while (true) {
        let location = currentNumber;
        maps.forEach((set, i) => {
            const nextMapping = set.find(
                (map) => location >= map.destination && location < map.destination + map.amount,
            );

            if (nextMapping) {
                const nextLocation = location - nextMapping.destination + nextMapping.source;
                location = nextLocation;
            }
        });

        const isValidNumber = seeds.some((seedObj) => {
            return location >= seedObj.start && location <= seedObj.end;
        });

        if (isValidNumber) {
            return '' + currentNumber;
        } else {
            currentNumber++;
        }
    }
};
