import { Dice } from './dice';
import { rl, prompt } from './readLine';
import { generateFairRandomInt, verifyHMAC } from './fairRandom';

function printDiceMenu(dL: Dice[], excludeIndex?: number) {
  console.log("\nChoose a dice:");
  dL.forEach((dice, i) => {
    if (i !== excludeIndex) {
      console.log(`  [${i}] Dice ${i + 1}: [${dice.faces.join(', ')}]`);
    }
  });
  console.log("  [H] Help");
  console.log("  [E] Exit");
}

function printHelp(dL: Dice[]) {
  console.log("\n=== Help ===");
  console.log("=== Dice Win Probabilities ===");
  console.log("       | " + dL.map((_, i) => `D${i + 1}  `).join(''));
  console.log("-------+".padEnd(8 + dL.length * 5, '-'));
  
  for (let i = 0; i < dL.length; i++) {
    let row = ` D${i + 1} | `;
    for (let j = 0; j < dL.length; j++) {
      if (i === j) {
        row += " -    ";
      } else {
        const p = calculateWinProbability(dL[i], dL[j]);
        row += `${(p * 100).toFixed(0)}% `.padEnd(5, ' ');
      }
    }
    console.log(row);
  }
  
  console.log(`
Each cell shows the win probability of the row dice against the column dice.
For example, if D1 vs D2 = 66%, it means D1 wins 66% of rolls against D2.

- This is a non-transitive dice game.
- Each round, you choose one of the available dice.
- The computer will choose a different dice.
- Both will roll one face randomly (fairly).
- The higher number wins the round.
- Type the number of the dice to choose it.
- Type H to see this help message again.
- Type E to exit the game.
`);
}

function calculateWinProbability(d1: Dice, d2: Dice): number {
  let wins = 0;
  const total = d1.faces.length * d2.faces.length;
  for (const f1 of d1.faces) {
    for (const f2 of d2.faces) {
      if (f1 > f2) wins++;
    }
  }
  return wins / total;
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
      printHelp(dL);
      continue;
    }

    const useri = parseInt(input);
    if (isNaN(useri) || useri < 0 || useri >= dL.length) {
      console.log("Invalid input. Please enter a valid number, H for help, or E to exit.");
      continue;
    }
    const computeri = (() => {
      let i: number;
      do {
        i = Math.floor(Math.random() * dL.length);
      } while (i === useri);
      return i;
    })();

    const userD = dL[useri];
    const comD = dL[computeri];
    const { key: cKey, number: cNumber, hmac: cHmac } = generateFairRandomInt(comD.faces.length);
    console.log(`\nI selected a random value in the range 0..${comD.faces.length - 1} (HMAC=${cHmac})`);
    console.log(`Add your number modulo ${comD.faces.length}.`);
    for (let i = 0; i < comD.faces.length; i++) {
      console.log(`  ${i} - ${i}`);
    }
    console.log("  X - Exit");
    console.log("  ? - Help");

    const userRollInput = (await prompt("Your selection: ")).trim().toUpperCase();
    if (userRollInput === 'X') {
      console.log("Exiting game.");
      break;
    }
    if (userRollInput === '?') {
      printHelp(dL);
      continue;
    }

    const userRoll = parseInt(userRollInput);
    if (isNaN(userRoll) || userRoll < 0 || userRoll >= comD.faces.length) {
      console.log("Invalid roll input. Try again.");
      continue;
    }

    const finalRoll = (userRoll + cNumber) % comD.faces.length;
    console.log(`My number is ${cNumber} (KEY=${cKey.toString('hex')}).`);
    console.log(`The fair number generation result is ${cNumber} + ${userRoll} = ${finalRoll} (mod ${comD.faces.length}).`);
    console.log(`My roll result is ${comD.faces[finalRoll]}.`);
    const { key: uKey, number: uNumber, hmac: uHmac } = generateFairRandomInt(userD.faces.length);
    console.log(`\nIt's time for your roll.`);
    console.log(`I selected a random value in the range 0..${userD.faces.length - 1} (HMAC=${uHmac})`);
    console.log(`Add your number modulo ${userD.faces.length}.`);
    for (let i = 0; i < userD.faces.length; i++) {
      console.log(`  ${i} - ${i}`);
    }
    console.log("  X - Exit");
    console.log("  ? - Help");

    const compRollInput = (await prompt("Your selection: ")).trim().toUpperCase();
    if (compRollInput === 'X') {
      console.log("Exiting game.");
      break;
    }
    if (compRollInput === '?') {
      printHelp(dL);
      continue;
    }

    const compRoll = parseInt(compRollInput);
    if (isNaN(compRoll) || compRoll < 0 || compRoll >= userD.faces.length) {
      console.log("Invalid roll input. Try again.");
      continue;
    }

    const finalUserRoll = (compRoll + uNumber) % userD.faces.length;
    console.log(`My number is ${uNumber} (KEY=${uKey.toString('hex')}).`);
    console.log(`The fair number generation result is ${uNumber} + ${compRoll} = ${finalUserRoll} (mod ${userD.faces.length}).`);
    console.log(`Your roll result is ${userD.faces[finalUserRoll]}.`);

    if (userD.faces[finalUserRoll] > comD.faces[finalRoll]) {
      console.log("You win this round!");
      userScore++;
    } else if (comD.faces[finalRoll] > userD.faces[finalUserRoll]) {
      console.log("Computer wins this round.");
      computerScore++;
    } else {
      console.log("It's a tie.");
    }

    round++;
  }

  rl.close();
}
