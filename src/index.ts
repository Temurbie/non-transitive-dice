// index.ts
import { parseDiceArgs } from './validator';
import { Dice } from './dice';
import { fairRandom } from './fairrandom';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  try {
    const args = process.argv.slice(2);
    const diceList = parseDiceArgs(args).map(faces => new Dice(faces));

    console.log("\nWelcome to the Non-Transitive Dice Game!\n");

    const userNum = parseInt(await prompt("Pick a number between 0 and 100: "));
    const computerNum = Math.floor(Math.random() * 101);
    const result = fairRandom(userNum, computerNum);

    console.log(`You picked: ${userNum}`);
    console.log(`Computer picked (revealed): ${computerNum}`);
    console.log(`Result of XOR: ${result} → ${result % 2 === 0 ? "You start!" : "Computer starts!"}`);

    // CLI menu loop...
    rl.close();
  } catch (err) {
    console.error("\nError:", (err as Error).message);
    process.exit(1);
  }
}

main();
