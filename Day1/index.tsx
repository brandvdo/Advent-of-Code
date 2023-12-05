import * as fs from 'fs';
import * as readline from 'readline';

// Replace 'file.txt' with your file's path
const filePath = 'input.txt';




readFileLineByLine(filePath)
  .then(() => console.log('File reading completed'))
  .catch((err) => console.error('Error reading file:', err));

async function readFileLineByLine(filePath: string): Promise<void> {
    let total = 0;
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
       total += calculateLineValue(line)
    }
    console.log("Total: " + total)
}

function calculateLineValue(line : string): number {
    let total = 0;

    //total+= getFirstAndLast(line);
    total+=getLineValue(line)
    return total
}

function getLineValue(line : string) : number{
    let left = false; let right = false;
    let numberString = ["one","two","three","four","five","six","seven","eight","nine"];
    let results: { index: number; value: number }[] = [];
    
    for (let i = 0; i < numberString.length; i++) {
        let index = -1;
        while ((index = line.indexOf(numberString[i], index + 1)) !== -1) {
            results.push({ index, value: i + 1 });
        }
    }

    //First left number
    let i = 0;
    while (i < line.length && !left) {
        if(!isNaN(parseInt(line[i], 10))){
            results.push({index: i, value: parseInt(line[i],10)})
            left = true
        }
        i++;
    }

    //First right number
    i = line.length - 1;
    while (i >= 0 && !right) {
        if(!isNaN(parseInt(line[i], 10))){
            results.push({index: i, value: parseInt(line[i],10)})
            right = true
        }
        i--;
    }

    //Sort by index
    results = results.sort((a, b) => a.index - b.index)
    const value = parseInt((results[0].value.toString() + results[results.length-1].value.toString()),10)
    if(value == 12){
        console.log("Line: " + line + " value: " + value + " result[]:")
        results.forEach(obj => {
            console.log(obj)
        })
    }
    return value
}


