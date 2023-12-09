import * as fs from 'fs';
import * as readline from 'readline';

const filePath = 'input.txt';

interface seed {
    sourceID: number;
    destinationID: number;
}


interface GameData {
    plantedSeeds : number[];
    seedToSoil : seed[];
    soilToFertilizer: seed[];
    fertilizerToWater: seed[];
    waterToLight: seed[];
    lightToTemp: seed[];
    tempToHumity: seed[];
    humidityToLoc: seed[];
}

Main(filePath)
  .then(() => console.log('File reading completed'))
  .catch((err) => console.error('Error reading file:', err)); 

//Read the input file

const gameData : GameData = {
    plantedSeeds: [],
    seedToSoil: [],
    soilToFertilizer: [],
    fertilizerToWater: [],
    waterToLight: [],
    lightToTemp: [],
    tempToHumity: [],
    humidityToLoc: []
};

const seedData : any[] = []

async function Main(filePath: string): Promise<void> {
    
    const inputArray : string[] = [];
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity,});

    //Push games to an array and get Part 1 total
    for await (const line of rl) {
        inputArray.push(line);
    }
    console.log("1")
    generateGameData(inputArray)
    console.log("2")
    gameData.plantedSeeds.forEach(seed =>{
        seedData.push(findSeedMatch(seed))
    })
    console.log("3")
    seedData.sort((a,b)=> a.location - b.location);
    console.log("Lowest Seed Location: " + seedData[0].location)

}

function generateGameData(inputArray : string []){
    generateRangeArrays(inputArray)
}

function findSeedMatch(seed : number) : any{ 

    let soil = gameData.seedToSoil.find(obj=>obj.sourceID === seed)?.destinationID
    if(soil == undefined)
        soil = seed
    let fertilizer = gameData.soilToFertilizer.find(obj=>obj.sourceID === soil)?.destinationID
    if(fertilizer == undefined)
        fertilizer = soil
    let water = gameData.fertilizerToWater.find(obj=>obj.sourceID === fertilizer)?.destinationID
    if(water == undefined)
        water = fertilizer
    let light = gameData.waterToLight.find(obj=>obj.sourceID === water)?.destinationID
    if(light == undefined)
        light = water
    let temp = gameData.lightToTemp.find(obj=>obj.sourceID === light)?.destinationID
    if(temp == undefined)
        temp = light
    let humidity = gameData.tempToHumity.find(obj=>obj.sourceID === temp)?.destinationID
    if(humidity == undefined)
        humidity = temp
    let location = gameData.humidityToLoc.find(obj=>obj.sourceID === humidity)?.destinationID
    if(location == undefined)
        location = humidity

    return ({
        seed,
        soil,
        fertilizer,
        water,
        light,
        temp,
        humidity,
        location
    })
}

function generateRangeArrays(inputArray : string[]){ 

    let currentLineNumber = 3;
    let step = 1;

    for(let i = 1; i <= inputArray[0].split(' ').length -1; i++){
        gameData.plantedSeeds.push(parseInt(inputArray[0].split(' ')[i]))
    }
    while(currentLineNumber<inputArray.length){
        let currentLine = inputArray[currentLineNumber];
        console.log(currentLineNumber)
        if(currentLine == ""){
            step++;
            currentLineNumber++;
        }else{
            for(let j = 0; j < parseInt(currentLine.split(" ")[2]); j++){
                switch(step){
                    case 1 :
                        gameData.seedToSoil.push({destinationID: parseInt(currentLine.split(" ")[0]) + j, sourceID: parseInt(currentLine.split(" ")[1]) + j})
                    break;
                    case 2: 
                        gameData.soilToFertilizer.push({destinationID: parseInt(currentLine.split(" ")[0]) + j, sourceID: parseInt(currentLine.split(" ")[1]) + j})
                    break;
                    case 3: 
                        gameData.fertilizerToWater.push({destinationID: parseInt(currentLine.split(" ")[0]) + j, sourceID: parseInt(currentLine.split(" ")[1]) + j})
                    break;
                    case 4: 
                        gameData.waterToLight.push({destinationID: parseInt(currentLine.split(" ")[0]) + j, sourceID: parseInt(currentLine.split(" ")[1]) + j})
                    break;
                    case 5: 
                        gameData.lightToTemp.push({destinationID: parseInt(currentLine.split(" ")[0]) + j, sourceID: parseInt(currentLine.split(" ")[1]) + j})
                    break;
                    case 6: 
                        gameData.tempToHumity.push({destinationID: parseInt(currentLine.split(" ")[0]) + j, sourceID: parseInt(currentLine.split(" ")[1]) + j})
                    break;
                    case 7: 
                        gameData.humidityToLoc.push({destinationID: parseInt(currentLine.split(" ")[0]) + j, sourceID: parseInt(currentLine.split(" ")[1]) + j})
                    break;
                }
            }
        }  
        currentLineNumber++;
    }
}