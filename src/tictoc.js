/* eslint-env node */
// helper for printing timings

export { tic, toc };

let timingStack = [];
let i = 0;

/**
 *
 * @param {string} label
 */
function tic(label = `Run command ${i++}`) {
  process.stdout.write(`${label}... `);
  timingStack.push([label, Date.now()]);
}

function toc() {
  let [label, start] = timingStack.pop();
  let time = (Date.now() - start) / 1000;
  process.stdout.write(`\r${label}... ${time.toFixed(3)} sec\n`);
}
