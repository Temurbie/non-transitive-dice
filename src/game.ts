import readline from 'readline';
import { Dice } from './dice';
import { rl, prompt} from './readLine'
import { userInfo } from 'os';

function printDiceMenu(dL: Dice[]) {
  console.log("\nChoose a dice:");
  dL.forEach((dice, i) => {
    console.log(`  [${i}] Dice ${i + 1}: [${dice.faces.join(', ')}]`);
  });
  console.log("  [H] Help");
  console.log("  [E] Exit");
}

function printHelp() {
  console.log(`
=== Help ===
- This is a non-transitive dice game.
- Each round, you choose one of the available dice.
- The computer will choose a different dice.
- Both will roll one face randomly.
- The higher number wins the round.
- Type the number of the dice to choose it.
- Type H to see this help message again.
- Type E to exit the game.
`);
}

function getRandomi(max: number): number {
  return Math.floor(Math.random() * max);
}

function selectcomD(dL: Dice[], useri: number): number {
  let i: number;
  do {
    i = getRandomi(dL.length);
  } while (i === useri);
  return i;
}

export async function gameLoop(dL: Dice[]) {
  let round = 1;
  let userScore = 0;
  let computerScore = 0;

  while (true) {
    console.log(`\nRound ${round}`);
    printDiceMenu(dL);

    const input = (await prompt("Your choice: ")).trim().toUpperCase();

    if (input === 'E') {
      console.log("\nGame Over.");
      console.log(`Final Score — You: ${userScore} | Computer: ${computerScore}`);
      break;
    }

    if (input === 'H') {
      printHelp();
      continue;
    }

    const useri = parseInt(input);
    if (isNaN(useri) || useri < 0 || useri >= dL.length) {
      console.log("Invalid input. Please enter a valid number, H for help, or E to exit.");
      continue;
    }

    const computeri = selectcomD(dL, useri);

    const userD = dL[useri];
    const comD = dL[computeri];

    const userR = userD.roll();
    const comR = comD.roll();

    console.log(`\nYou selected Dice ${useri + 1}: [${userD.faces.join(', ')}]`);
    console.log(`Computer selected Dice ${computeri + 1}: [${comD.faces.join(', ')}]`);
    console.log(`You rolled: ${userR}`);
    console.log(`Computer rolled: ${comR}`);

    if (userR > comR) {
      console.log(" You win this round!");
      userScore++;
    } else if (comR > userR) {
      console.log(" Computer wins this round.");
      computerScore++;
    } else {
      console.log(" It's a tie.");
    }

    round++;
  }

  rl.close();
}
// console.log(userInfo);
