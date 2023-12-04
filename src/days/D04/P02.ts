import { log } from 'console';
import { Utils } from '../../utils';

interface Card {
    id: number;
    winningNumbers: string[];
    myNumbers: string[];
}

export const solve = (input: string): string => {
    let originalCards: Card[] = input.split('\n').map((line, i) => {
        const winningNumbers = line
            .split('|')[0]
            .split(':')[1]
            .split(' ')
            .filter((e) => e != '');

        const myNumbers = line
            .split('|')[1]
            .split(' ')
            .filter((e) => e != '');

        return {
            id: i,
            winningNumbers,
            myNumbers,
        };
    });

    let currentCards = [...originalCards];
    for (let i = 0; i < originalCards.length; i++) {
        const cardsForGame = currentCards.filter((c) => c.id == i);
        cardsForGame.forEach((card) => {
            const numberOfMatches = getMatchesForCard(card);
            const cardsToBeAdded: Card[] = [...originalCards].slice(card.id + 1, card.id + numberOfMatches + 1);

            cardsToBeAdded.forEach((c) => currentCards.push(c));
        });
    }

    return currentCards.length + '';
};

const getMatchesForCard = (card: Card) => {
    let numberOfMatches = 0;
    card.myNumbers.forEach((number) => {
        if (card.winningNumbers.some((wn) => wn == number)) {
            numberOfMatches++;
        }
    });
    return numberOfMatches;
};
