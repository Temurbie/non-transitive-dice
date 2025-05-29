
export class Dice {
  constructor(public faces: number[]) {}

  roll(): number {
    const index = Math.floor(Math.random() * this.faces.length);
    
    return this.faces[index];
  }
}


