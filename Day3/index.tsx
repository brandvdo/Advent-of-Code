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
    let total : number[] = [];
    let lineArray : string[] = [];
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    //Place all lines of input into an array
    for await (const line of rl) {
       lineArray.push(line)
    }

    //Get the sum of part numbers
    total = getSumOfPartNumbers(lineArray)

    console.log("Total: " + total)
}



function getSumOfPartNumbers(lineArray : string[]): number[] {
    let total : number[] = [0,0];
    const numbers: NumberData[] = [];
    const symbols: { symbol: string; lineIndex: number; index: number }[] = [];
    let lineIndex = 0
    const foundNumbers: NumberData[] = []
    const gearsFound: NumberData[] = []
    /*
        Check for all numbers in each line of the input, save the numbers line number, start char index, and endchar index.
    */
    const regex = /\b\d+\b/g;
    lineArray.forEach(line => {
        const foundNumArray: string[] = line.match(regex) || [];
        if(foundNumArray.length > 0){
            foundNumArray.forEach((obj : string) =>{
                let indexArray = findAllIndices(line,obj);
                indexArray?.forEach(indexFound =>{
                    const newObj : NumberData= {
                        value: parseInt(obj,10),
                        lineIndex: lineIndex,
                        startChar: indexFound[0],
                        endChar: indexFound[1],
                    };
                    numbers.push(newObj)  
                })
            })
        }

        //Find all symbols and their line number and index within the string
        for (let i = 0; i < line.length; i++) {
            const char = line.charAt(i);
            if (char !== '.' && !/\w/.test(char)) {
                symbols.push({ symbol: char, lineIndex: lineIndex, index: i });
            }
        }

        lineIndex++;
    })

    /*
        For each number found
            Check against all symbols
                If the difference between the line numbers are 1,0,-1 && If the difference between the start or end char numbers are 1,0,-1 then its a valid number
    */
    numbers.forEach(number => {
        symbols.forEach(symbol => {
            const alreadyFound = foundNumbers.some(foundNumber =>
                foundNumber.value === number.value &&
                foundNumber.lineIndex === number.lineIndex &&
                foundNumber.startChar === number.startChar &&
                foundNumber.endChar === number.endChar
            );
    
            if (!alreadyFound && Math.abs(symbol.lineIndex - number.lineIndex) <= 1 &&
                (Math.abs(symbol.index - number.startChar) <= 1 || Math.abs(symbol.index - number.endChar) <= 1)) {
                foundNumbers.push(number);
            }
        });
    });

    foundNumbers.forEach(number =>{
        total[0]+= number.value;
    })


    symbols.forEach(symbol => {
        if(symbol.symbol == '*'){
            const adjecentNumbers : any[] = []
            const usedNumbers : any[] = []
             numbers.forEach(number=>{
                const alreadyFound = usedNumbers.some(foundNumber =>
                    foundNumber.value === number.value &&
                    foundNumber.lineIndex === number.lineIndex &&
                    foundNumber.startChar === number.startChar &&
                    foundNumber.endChar === number.endChar
                );
                if(Math.abs(symbol.lineIndex - number.lineIndex) <= 1 &&
                (Math.abs(symbol.index - number.startChar) <= 1 || Math.abs(symbol.index - number.endChar) <= 1) && !alreadyFound){
                    adjecentNumbers.push(number)
                    usedNumbers.push(number)
                }
            })
            if(adjecentNumbers.length>1 && adjecentNumbers.length < 3){
                console.log("Adj: " + adjecentNumbers[0].value + ","+ adjecentNumbers[1].value + " Symbol: " + symbol.symbol + " Line: " + symbol.lineIndex);
                total[1] += (adjecentNumbers[0].value * adjecentNumbers[1].value)
            }
        }
    })




    return total
}


//Find the start and end char index of a numbers within a string
function findAllIndices(input: string, targetNumber: string): [number, number][] | null {
    const foundInteger: [number, number][] = [];
    let startIndex = input.indexOf(targetNumber);

    while (startIndex !== -1) {
        const endIndex = startIndex + targetNumber.length - 1;

        const beforeChar = startIndex === 0 ? '' : input[startIndex - 1];
        const afterChar = endIndex === input.length - 1 ? '' : input[endIndex + 1];

        if (!/\d/.test(beforeChar) && !/\d/.test(afterChar)) {
            foundInteger.push([startIndex, endIndex]);
        }

        startIndex = input.indexOf(targetNumber, startIndex + 1); // Search for next occurrence starting from next index
    }

    if (foundInteger.length <= 0)
        return null;
    else
        return foundInteger;
}

