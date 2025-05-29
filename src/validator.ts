

export function parseDiceArgs(args : string[]) : number[][]{

  if(args.length < 3){
    throw new Error("At least 3 dice must be provided. Example: ts-node index.ts 1,2,3,4,5,6 2,2,4,4,9,9 6,8,1,1,8,6")
  }

  let dice = args.map((arg,i) =>{
    let numbers = arg.split(',').map(Number);
    
    if(numbers.length < 6 || numbers.some(isNaN)){
      throw new Error(`Invalid dice format at position ${i + 1}. Each dice must contain exactly 6 integers. Example: 1,2,3,4,5,6`)
    } 
    return numbers;
  })


  return dice
}
// const res = parseDiceArgs([
//     "1,2,3,4,5,6",
//     "2,2,4,4,9,9"
//   ]);
//   console.log(res);
  