import { parseDiceArgs } from './validator';
import { Dice } from './dice';
import { rl, prompt } from './readLine';
import { gameLoop } from './game';
import { generateFairRandomInt, verifyHMAC } from './fairRandom';

async function main() {
  try {
    const args = process.argv.slice(2);
    const diceList = parseDiceArgs(args).map(faces => new Dice(faces));

    console.log("\n Welcome to the Non-Transitive Dice Game!\n");

    const { key: secretKey, number: computerChoice, hmac } = generateFairRandomInt(2);

    console.log(`I selected a random value in the range 0..1 (HMAC): ${hmac}`);
    console.log(`Try to guess my selection.`);

    const userNumInput = await prompt("Pick a number between 0 and 1: ");
    const userNum = parseInt(userNumInput);
    if (isNaN(userNum) || userNum < 0 || userNum > 1) {
      throw new Error("Invalid number. Must be between 0 and 1.");
    }

    console.log(`\nComputer picked (revealed): ${computerChoice}`);
    console.log(`Secret key (in hex): ${secretKey.toString('hex')}`);

    const verifyHMACResult = verifyHMAC(secretKey, computerChoice.toString(), hmac);
    console.log(`Verify HMAC: ${verifyHMACResult ? "Valid!" : "Invalid! Computer cheated!"}`);

    const result = (userNum + computerChoice) % 2;
    console.log(`\nResult: (You + Computer) % 2 = ${(userNum + computerChoice)} % 2 = ${result}`);
    console.log(result === 0 ? " You start first!" : " Computer starts first!");

    await gameLoop(diceList);
    rl.close();
  } catch (err) {
    console.error("\nError:", (err as Error).message);
    process.exit(1);
  }
}

main();
