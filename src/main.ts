// this script is not part of the web UI,
// it can be used to quickly test everything with node
import { deploy } from './sudoku.js';
import { cloneSudoku, generateSudoku, solveSudoku } from './sudoku-lib.js';
import { shutdown } from 'snarkyjs';
import { tic, toc } from './tictoc.js';

// deploy sudoku zkapp
let zkapp = await deploy(generateSudoku(0.5));

console.log('Is sudoku solved?', zkapp.getState().isSolved);
let solution = solveSudoku(zkapp.sudoku);

// submit a wrong solution
let noSolution = cloneSudoku(solution);
noSolution[0][0] = (noSolution[0][0] % 9) + 1; // change (0,0) entry by 1

await zkapp.submitSolution(noSolution);
console.log('Is sudoku solved?', zkapp.getState().isSolved);

// submit the actual solution
await zkapp.submitSolution(solution);
console.log('Is sudoku solved?', zkapp.getState().isSolved);

shutdown();
