
export function parseDiceArgs(args: string[]): number[][] {
  if (args.length < 3) {
    throw new Error("At least 3 dice must be provided. Example: ts-node index.ts 1,2,3,4,5,6 2,2,4,4,9,9 6,8,1,1,8,6");
  }

  const dice = args.map((arg, index) => {
    const numbers = arg.split(',').map(Number);
    if (numbers.length !== 6 || numbers.some(isNaN)) {
      throw new Error(`Invalid dice format at position ${index + 1}. Each dice must contain exactly 6 integers. Example: 1,2,3,4,5,6`);
    }
    return numbers;
  });

  return dice;
}
