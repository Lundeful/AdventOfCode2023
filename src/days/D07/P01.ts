import { log } from 'console';
import { Utils } from '../../utils';

interface Hand {
    cards: Card[];
    bid: number;
    score: number;
}

interface Card {
    name: string;
    value: number;
}

const strengthOrder = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse();

export const solve = (input: string): string => {
    const lines = input.split('\n');
    const hands: Hand[] = lines.map((l) => {
        const parts = l.split(' ');
        const bid = parseInt(parts[1]);
        const cards = parts[0].split('').map(
            (c): Card => ({
                name: c,
                value: strengthOrder.findIndex((s) => c === s),
            }),
        );

        return {
            cards,
            bid,
            score: getScoreForHand(cards),
        };
    });

    const scoredHands = hands
        .sort((a, b) => {
            if ((a.score < 15 && b.score < 15) || a.score === b.score) {
                for (let i = 0; i < 5; i++) {
                    const ac = a.cards[i].value;
                    const bc = b.cards[i].value;

                    if (ac !== bc) {
                        return bc - ac;
                    }
                }
            }

            return b.score - a.score;
        })
        .map((h, i) => ({
            ...h,
            winAmount: h.bid * (hands.length - i),
            rank: hands.length - i,
        }));

    const result = scoredHands.map((h) => h.winAmount).reduce(Utils.Reducers.add);
    log('Result', result);

    return '' + result;
};

const getScoreForHand = (hands: Card[]): number => {
    const cards = hands.map((c) => c.value);
    const uniqueCards = new Set(cards).size;

    // Check five of a kind
    if (uniqueCards === 1) {
        return 70;
    }

    // Check four of a kind
    if (cards.some((card) => cards.filter((c) => c === card).length === 4)) {
        return 60;
    }

    // Check full house
    if (
        cards.some((card) => cards.filter((c) => c === card).length === 3) &&
        cards.some((card) => cards.filter((c) => c === card).length === 2)
    ) {
        return 50;
    }

    // Check three of a kind
    if (cards.some((card) => cards.filter((c) => c === card).length === 3)) {
        return 40;
    }

    // Check two pair
    if (getPairs(cards) === 2) {
        return 30;
    }

    // Check one pair
    if (getPairs(cards) === 1) {
        return 20;
    }

    // get high card
    return Math.max(...cards);
};

const getPairs = (cards: number[]): number => {
    return cards.filter((rank) => cards.filter((r2) => r2 === rank).length === 2).length / 2;
};
