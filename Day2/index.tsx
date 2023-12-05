import * as fs from 'fs';
import * as readline from 'readline';

// Replace 'file.txt' with your file's path
const filePath = 'input.txt';




readFileLineByLine(filePath)
  .then(() => console.log('File reading completed'))
  .catch((err) => console.error('Error reading file:', err));

async function readFileLineByLine(filePath: string): Promise<void> {
    let total = 0;
    //Red,green,blue
    let bag : number[] = [12,13,14]
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
       total += isGameValid(line, bag)
    }
    console.log("Total: " + total)
}

function isGameValid(line : string, bag : number[]): number {
    let gameID = parseInt(line.split(':')[0].split(' ')[1],10);
    let splitString = line.split(':')[1].split(';').map(item => item.trim());
    let gameStates: string[][] = []
    let greatestCount = [0,0,0];
    splitString.forEach(obj => {
        let tempArray = obj.split(',');
        gameStates.push(tempArray)
    })

    gameStates.forEach(state => {
        state.forEach(count => {
            let tempArray = count.split(' ');
            let value = 0; let color = ""

            if(tempArray[0] == ''){
                value = parseInt(tempArray[1],10)
                color = tempArray[2]
            }else{
                value = parseInt(tempArray[0],10)
                color = tempArray[1]
            }

            if(color == "red"){
                if(value > bag[0]){
                    gameID = 0
                }
                if(value > greatestCount[0]){
                    greatestCount[0] = value
                }
            }else if(color == "green"){
                if(value > bag[1]){
                    gameID = 0
                }
                if(value > greatestCount[1]){
                    greatestCount[1] = value
                }
            }else{
                //blue
                if(value > bag[2]){
                    gameID = 0
                }
                if(value > greatestCount[2]){
                    greatestCount[2] = value
                }
            }
        })
    })
    //return gameID;
    return (greatestCount[0] * greatestCount[1] * greatestCount[2])
}



