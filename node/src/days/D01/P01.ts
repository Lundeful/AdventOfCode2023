import { Utils } from '../../utils';

export const solve = (input: string): string => {
    const lines = input.split('\n');

    var numbers = lines.map((line) => {
        var arr = line.split('').filter((char) => !isNaN(parseInt(char)));
        var number = arr[0] + arr[arr.length - 1];
        var parsed = parseInt(number);
        return parsed;
    });

    var result = numbers.reduce(Utils.Reducers.add).toString();

    return result;
};
