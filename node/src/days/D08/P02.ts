import { log } from 'console';
import { Utils } from '../../utils';

interface Node {
    current: string;
    left: string;
    right: string;
}

export const solve = (input: string): string => {
    const lines = input.split('\n');
    const instructions = lines[0].split('');
    const map = new Map<string, Node>();

    // Store all the nodes
    for (let i = 2; i < lines.length; i++) {
        const line = lines[i];
        const current = line.split(' ')[0];
        const left = line.slice(7, 10);
        const right = line.slice(12, 15);

        const node: Node = {
            current,
            left,
            right,
        };

        map[current] = node;
    }

    // Starting state
    const nodes = Object.keys(map).map((key) => map[key]) as Node[];
    const currentNodes = nodes.filter((n) => n.current.endsWith('A'));

    const steps: number[] = currentNodes.map((currentNode) => {
        let numberOfSteps = 0;
        let instructionIndex = 0;
        // Travel through map
        while (!currentNode.current.endsWith('Z')) {
            // Loop instructions
            if (instructionIndex >= instructions.length) {
                instructionIndex = 0;
            }

            // Get next instruction
            const instruction = instructions[instructionIndex];
            if (instruction == 'L') {
                currentNode = map[currentNode.left];
            } else if (instruction == 'R') {
                currentNode = map[currentNode.right];
            }

            // Increment
            numberOfSteps++;
            instructionIndex++;
        }

        return numberOfSteps;
    });

    let leastAmountOfSteps = -1;
    steps.forEach((step) => {
        leastAmountOfSteps = Utils.Math.getleastCommonMultiple(leastAmountOfSteps, step);
    });

    return '' + leastAmountOfSteps;
};
