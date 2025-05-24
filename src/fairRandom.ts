// FairRandom.ts
export function fairRandom(userNumber: number, computerNumber: number): number {
  return userNumber ^ computerNumber; // XOR orqali random
}
