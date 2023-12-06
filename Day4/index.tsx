import * as fs from 'fs';
import * as readline from 'readline';

const filePath = 'input.txt';

interface GameData {
    winningNumbers : number[];
    gameNumbers : number[];
    cardNumber : number;
    cardScore : number;
    matchCount : number;
    cardCount : number;
}

Main(filePath)
  .then(() => console.log('File reading completed'))
  .catch((err) => console.error('Error reading file:', err)); 



//Read the input file
async function Main(filePath: string): Promise<void> {
    let scoreTotal = 0;
    let cardCount = 0;
    const gameStrArray : string[]= [];
    let gameObjArray : GameData[] = [];
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity,});

    //Push games to an array and get Part 1 total
    for await (const line of rl) {
        gameStrArray.push(line);
        gameObjArray.push(createGameList(line,gameStrArray.length-1))
    }

    //Part 1 total
    gameObjArray.forEach(game =>{
        scoreTotal+=game.cardScore;
    })

    
    gameObjArray = updateGameList(gameObjArray);


    gameObjArray.forEach(game => {
        cardCount+=game.cardCount;
    })

    //console.log(gameObjArray)
    console.log("Part 1 Total: " + scoreTotal)
    console.log("Part 2 Total: " + cardCount)
}

function updateGameList(gameList: GameData[]): GameData[] {
    const newGameList: GameData[] = [...gameList];

    gameList.forEach(game => {
        
        let nextCardNumber = game.cardNumber;
        if(nextCardNumber > gameList.length){
            nextCardNumber = 0
        }
        for (let i = 1; i <= game.matchCount; i++) {
            newGameList[nextCardNumber] = {
                ...newGameList[nextCardNumber],
                cardCount: (newGameList[nextCardNumber].cardCount + newGameList[nextCardNumber - i].cardCount)
            }
            nextCardNumber++;
        }
    }); 

    return newGameList;
}


function createGameList(line : string, i : number) : GameData {
    let winningNumbers : number[] = []
    let gameNumbers : number[] = []
    let score = 0;
    let matchCount = 0;

    //Get Winning Numbers
    let temp : string[] = line.split('|')[0].split(":")[1].split(" ")
    temp.forEach(str =>{
        if(str !="")
            winningNumbers.push(parseInt(str,10))
    })

    //Get Game Numbers
    temp = line.split('|')[1].split(" ")
    temp.forEach(str =>{
        if(str !="")
        gameNumbers.push(parseInt(str,10))
    })

    winningNumbers.forEach(winNumb => {
        if(gameNumbers.includes(winNumb)){
            if(score == 0){
                score = 1
                matchCount++;
            }else{
                score = score*2
                matchCount++;
            }
        }
    })
    
    const game = {
        winningNumbers:winningNumbers,
        gameNumbers:gameNumbers,
        cardNumber: i + 1,
        cardScore: score,
        matchCount: matchCount,
        cardCount: 1
    }

    return game;
}