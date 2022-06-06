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
  console.log(`${label}... `);
  timingStack.push([label, Date.now()]);
}

function toc() {
  let [label, start] = timingStack.pop();
  let time = (Date.now() - start) / 1000;
  console.log(`\r${label}... ${time.toFixed(3)} sec\n`);
}
