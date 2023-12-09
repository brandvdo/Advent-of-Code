"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
var filePath = 'input.txt';
Main(filePath)
    .then(function () { return console.log('File reading completed'); })
    .catch(function (err) { return console.error('Error reading file:', err); });
//Read the input file
var gameData = {
    plantedSeeds: [],
    seedToSoil: [],
    soilToFertilizer: [],
    fertilizerToWater: [],
    waterToLight: [],
    lightToTemp: [],
    tempToHumity: [],
    humidityToLoc: []
};
var seedData = [];
function Main(filePath) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var inputArray, fileStream, rl, _d, rl_1, rl_1_1, line, e_1_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    inputArray = [];
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity, });
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 12]);
                    _d = true, rl_1 = __asyncValues(rl);
                    _e.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _e.sent(), _a = rl_1_1.done, !_a)) return [3 /*break*/, 5];
                    _c = rl_1_1.value;
                    _d = false;
                    line = _c;
                    inputArray.push(line);
                    _e.label = 4;
                case 4:
                    _d = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _e.trys.push([7, , 10, 11]);
                    if (!(!_d && !_a && (_b = rl_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _b.call(rl_1)];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    console.log("1");
                    generateGameData(inputArray);
                    console.log("2");
                    gameData.plantedSeeds.forEach(function (seed) {
                        seedData.push(findSeedMatch(seed));
                    });
                    console.log("3");
                    seedData.sort(function (a, b) { return a.location - b.location; });
                    console.log("Lowest Seed Location: " + seedData[0].location);
                    return [2 /*return*/];
            }
        });
    });
}
function generateGameData(inputArray) {
    generateRangeArrays(inputArray);
}
function findSeedMatch(seed) {
    var _a, _b, _c, _d, _e, _f, _g;
    var soil = (_a = gameData.seedToSoil.find(function (obj) { return obj.sourceID === seed; })) === null || _a === void 0 ? void 0 : _a.destinationID;
    if (soil == undefined)
        soil = seed;
    var fertilizer = (_b = gameData.soilToFertilizer.find(function (obj) { return obj.sourceID === soil; })) === null || _b === void 0 ? void 0 : _b.destinationID;
    if (fertilizer == undefined)
        fertilizer = soil;
    var water = (_c = gameData.fertilizerToWater.find(function (obj) { return obj.sourceID === fertilizer; })) === null || _c === void 0 ? void 0 : _c.destinationID;
    if (water == undefined)
        water = fertilizer;
    var light = (_d = gameData.waterToLight.find(function (obj) { return obj.sourceID === water; })) === null || _d === void 0 ? void 0 : _d.destinationID;
    if (light == undefined)
        light = water;
    var temp = (_e = gameData.lightToTemp.find(function (obj) { return obj.sourceID === light; })) === null || _e === void 0 ? void 0 : _e.destinationID;
    if (temp == undefined)
        temp = light;
    var humidity = (_f = gameData.tempToHumity.find(function (obj) { return obj.sourceID === temp; })) === null || _f === void 0 ? void 0 : _f.destinationID;
    if (humidity == undefined)
        humidity = temp;
    var location = (_g = gameData.humidityToLoc.find(function (obj) { return obj.sourceID === humidity; })) === null || _g === void 0 ? void 0 : _g.destinationID;
    if (location == undefined)
        location = humidity;
    return ({
        seed: seed,
        soil: soil,
        fertilizer: fertilizer,
        water: water,
        light: light,
        temp: temp,
        humidity: humidity,
        location: location
    });
}
function generateRangeArrays(inputArray) {
    var currentLineNumber = 3;
    var step = 1;
    for (var i = 1; i <= inputArray[0].split(' ').length - 1; i++) {
        gameData.plantedSeeds.push(parseInt(inputArray[0].split(' ')[i]));
    }
    while (currentLineNumber < inputArray.length) {
        var currentLine = inputArray[currentLineNumber];
        console.log(currentLineNumber);
        if (currentLine == "") {
            step++;
            currentLineNumber++;
        }
        else {
            for (var j = 0; j < parseInt(currentLine.split(" ")[2]); j++) {
                switch (step) {
                    case 1:
                        gameData.seedToSoil.push({ destinationID: parseInt(currentLine.split(" ")[0]) + j, sourceID: parseInt(currentLine.split(" ")[1]) + j });
                        break;
                    case 2:
                        gameData.soilToFertilizer.push({ destinationID: parseInt(currentLine.split(" ")[0]) + j, sourceID: parseInt(currentLine.split(" ")[1]) + j });
                        break;
                    case 3:
                        gameData.fertilizerToWater.push({ destinationID: parseInt(currentLine.split(" ")[0]) + j, sourceID: parseInt(currentLine.split(" ")[1]) + j });
                        break;
                    case 4:
                        gameData.waterToLight.push({ destinationID: parseInt(currentLine.split(" ")[0]) + j, sourceID: parseInt(currentLine.split(" ")[1]) + j });
                        break;
                    case 5:
                        gameData.lightToTemp.push({ destinationID: parseInt(currentLine.split(" ")[0]) + j, sourceID: parseInt(currentLine.split(" ")[1]) + j });
                        break;
                    case 6:
                        gameData.tempToHumity.push({ destinationID: parseInt(currentLine.split(" ")[0]) + j, sourceID: parseInt(currentLine.split(" ")[1]) + j });
                        break;
                    case 7:
                        gameData.humidityToLoc.push({ destinationID: parseInt(currentLine.split(" ")[0]) + j, sourceID: parseInt(currentLine.split(" ")[1]) + j });
                        break;
                }
            }
        }
        currentLineNumber++;
    }
}
