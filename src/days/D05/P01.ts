export const solve = (input: string): string => {
    const lines = input.split('\n');

    const seeds = lines[0]
        .split(':')[1]
        .trim()
        .split(' ')
        .map((s) => parseInt(s));

    const mapIndices = lines.map((l, i) => (l.includes('map:') ? i : -1)).filter((n) => n != -1);

    const maps = mapIndices.map((mapIndex, i) =>
        lines
            .slice(mapIndex + 1, i + 1 < mapIndices.length ? mapIndices[i + 1] - 1 : undefined)
            .map((l) => l.split(' ').map((n) => parseInt(n)))
            .map((map) => {
                const destination = map[0];
                const start = map[1];
                const range = map[2];

                return {
                    destination,
                    start: start,
                    end: start + range - 1,
                };
            }),
    );

    const locations = seeds.map((seed) => {
        let location = seed;
        maps.forEach((set, i) => {
            const nextMapping = set.find((map) => location >= map.start && location <= map.end);

            if (nextMapping) {
                const nextLocation = nextMapping.destination + location - nextMapping.start;
                location = nextLocation;
            }
        });

        return location;
    });

    const result = Math.min(...locations);
    return '' + result;
};
