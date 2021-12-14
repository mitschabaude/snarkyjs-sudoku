// this script is not part of the web UI,
// it can be used to quickly test everything with node
import { deploy } from './sudoku-snapp.js';
import { cloneSudoku, generateSudoku, solveSudoku } from './sudoku-lib.js';
import { shutdown } from 'snarkyjs';

// deploy 2 sudoku snapps
let snapp1 = await deploy(generateSudoku(0.5));
let snapp2 = await deploy(generateSudoku(0.5));

// test the first deployment

console.log('Is sudoku 1 solved?', (await snapp1.getSnappState()).isSolved);
let solution = solveSudoku(snapp1.sudoku);

// submit a wrong solution
let noSolution = cloneSudoku(solution);
noSolution[0][0] = (noSolution[0][0] % 9) + 1; // change (0,0) entry by 1

await snapp1.submitSolution(noSolution);
console.log('Is sudoku 1 solved?', (await snapp1.getSnappState()).isSolved);

// submit the actual solution
await snapp1.submitSolution(solution);
console.log('Is sudoku 1 solved?', (await snapp1.getSnappState()).isSolved);

// test the second deployment
console.log('Is sudoku 2 solved?', (await snapp2.getSnappState()).isSolved);
await snapp2.submitSolution(solveSudoku(snapp2.sudoku));
console.log('Is sudoku 2 solved?', (await snapp2.getSnappState()).isSolved);

shutdown();
