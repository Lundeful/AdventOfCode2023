const Reducers = {
    add: (a: number, b: number) => a + b,
    multiply: (a: number, b: number) => a * b,
};

const getGreatestCommonDivisor = (a: number, b: number): number => {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }

    return a;
};

const getleastCommonMultiple = (a: number, b: number): number => {
    const greatestCommonDivisor = getGreatestCommonDivisor(a, b);
    const lowestCommonMultiple = (a * b) / greatestCommonDivisor;
    return lowestCommonMultiple;
};

const Math = {
    getGreatestCommonDivisor,
    getleastCommonMultiple,
};

export const Utils = {
    Reducers,
    Math,
};
