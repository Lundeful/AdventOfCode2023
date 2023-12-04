import { Utils } from '../../utils';

export const solve = (input: string): string => {
    const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    digits.forEach((digit, i) => {
        input = input.replaceAll(digit, digit + (i + 1).toString() + digit);
    });

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
