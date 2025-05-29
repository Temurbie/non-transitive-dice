# 🎲 Non-Transitive Dice Game

This is a command-line implementation of the famous **non-transitive dice** game — a probability paradox where the best choice isn't always obvious.

Play against the computer, make strategic decisions, and test your luck!

## 🖥 Demo

```bash
$ ts-node index.ts 4,4,4,4,4,4 3,3,3,3,6,6 2,2,2,5,5,5
Welcome to the Non-Transitive Dice Game!

Pick a number between 0 and 100: 42
You picked: 42
Computer picked (revealed): 17
Result of XOR: 59 → Computer starts!

Round 1
Choose a dice:
  [0] Dice 1: [4, 4, 4, 4, 4, 4]
  [1] Dice 2: [3, 3, 3, 3, 6, 6]
  [2] Dice 3: [2, 2, 2, 5, 5, 5]
  [H] Help
  [E] Exit
Your choice: 1
...

## ✨ Features

- 🧠 Play with custom non-transitive dice sets
- 🎯 Fair random starting player selector using XOR
- 🆚 Computer picks a different dice from yours
- 🏆 Score tracking per round
- 📖 In-game help menu (`H`)
- ❌ Exit anytime with `E`

## ⚙️ Installation

1. Clone the repo:
```bash
git clone https://github.com/your-username/non-transitive-dice.git
cd non-transitive-dice

npm install


---

### 5. **Usage**
```markdown
## 🚀 Usage

Run the game using `ts-node` and provide dice as arguments:
```bash
npx ts-node index.ts 4,4,4,4,4,4 3,3,3,3,6,6 2,2,2,5,5,5



---

### 6. **Help Menu (You already have this)**
```markdown
## 🆘 In-Game Help

- This is a non-transitive dice game.
- Each round, you choose one of the available dice.
- The computer will choose a different dice.
- Both will roll one face randomly.
- The higher number wins the round.
- Type the number of the dice to choose it.
- Type H to see this help message again.
- Type E to exit the game.

## 📁 Project Structure

├── src/
│ ├── index.ts # Entry point
│ ├── game.ts # Game loop and logic
│ ├── dice.ts # Dice class
│ ├── validator.ts # Argument parser and checker
│ ├── fairRandom.ts # XOR-based starter selector
│ └── readLine.ts # Shared prompt and rl interface
├── README.md
├── package.json
└── tsconfig.json

## 📝 License

This project is licensed under the MIT License.
