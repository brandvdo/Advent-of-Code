import * as fs from 'fs';
import * as readline from 'readline';

const filePath = 'input.txt';

interface NumberData {
    value: number;
    lineIndex: number;
    startChar: number;
    endChar: number;
}

readFileLineByLine(filePath)
  .then(() => console.log('File reading completed'))
  .catch((err) => console.error('Error reading file:', err)); 



//Read the input file
async function readFileLineByLine(filePath: string): Promise<void> {
    let total = 0;
    let lineArray : string[] = [];
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    //Place all lines of input into an array
    for await (const line of rl) {
        total+=checkCardPoints(line)
    }

   

    console.log("Total: " + total)
}



function checkCardPoints(game : string) : number{
    let score = 0;

    let winningNumbers : number[] = []
    let gameNumbers : number[] = []

    //Get Winning Numbers
    let temp : string[] = game.split('|')[0].split(":")[1].split(" ")
    temp.forEach(str =>{
        if(str !="")
            winningNumbers.push(parseInt(str,10))
    })

    //Get Winning Numbers
    temp = game.split('|')[1].split(" ")
    temp.forEach(str =>{
        if(str !="")
        gameNumbers.push(parseInt(str,10))
    })

    winningNumbers.forEach(winNumb => {
        if(gameNumbers.includes(winNumb)){
            if(score == 0){
                score = 1
            }else{
                score = score*2
            }
        }
    })
    
    return score;
}