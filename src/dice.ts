
export class Dice {
  constructor(public faces: number[]) {}

  roll(seed?: number): number {
    const index = Math.floor(Math.random() * this.faces.length);
    return this.faces[index];
  }
}
