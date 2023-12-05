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
readFileLineByLine(filePath)
    .then(function () { return console.log('File reading completed'); })
    .catch(function (err) { return console.error('Error reading file:', err); });
//Read the input file
function readFileLineByLine(filePath) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var total, lineArray, fileStream, rl, _d, rl_1, rl_1_1, line, e_1_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    total = [];
                    lineArray = [];
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity,
                    });
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
                    lineArray.push(line);
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
                    //Get the sum of part numbers
                    total = getSumOfPartNumbers(lineArray);
                    console.log("Total: " + total);
                    return [2 /*return*/];
            }
        });
    });
}
function getSumOfPartNumbers(lineArray) {
    var total = [0, 0];
    var numbers = [];
    var symbols = [];
    var lineIndex = 0;
    var foundNumbers = [];
    var gearsFound = [];
    /*
        Check for all numbers in each line of the input, save the numbers line number, start char index, and endchar index.
    */
    var regex = /\b\d+\b/g;
    lineArray.forEach(function (line) {
        var foundNumArray = line.match(regex) || [];
        if (foundNumArray.length > 0) {
            foundNumArray.forEach(function (obj) {
                var indexArray = findAllIndices(line, obj);
                indexArray === null || indexArray === void 0 ? void 0 : indexArray.forEach(function (indexFound) {
                    var newObj = {
                        value: parseInt(obj, 10),
                        lineIndex: lineIndex,
                        startChar: indexFound[0],
                        endChar: indexFound[1],
                    };
                    numbers.push(newObj);
                });
            });
        }
        //Find all symbols and their line number and index within the string
        for (var i = 0; i < line.length; i++) {
            var char = line.charAt(i);
            if (char !== '.' && !/\w/.test(char)) {
                symbols.push({ symbol: char, lineIndex: lineIndex, index: i });
            }
        }
        lineIndex++;
    });
    /*
        For each number found
            Check against all symbols
                If the difference between the line numbers are 1,0,-1 && If the difference between the start or end char numbers are 1,0,-1 then its a valid number
    */
    numbers.forEach(function (number) {
        symbols.forEach(function (symbol) {
            var alreadyFound = foundNumbers.some(function (foundNumber) {
                return foundNumber.value === number.value &&
                    foundNumber.lineIndex === number.lineIndex &&
                    foundNumber.startChar === number.startChar &&
                    foundNumber.endChar === number.endChar;
            });
            if (!alreadyFound && Math.abs(symbol.lineIndex - number.lineIndex) <= 1 &&
                (Math.abs(symbol.index - number.startChar) <= 1 || Math.abs(symbol.index - number.endChar) <= 1)) {
                foundNumbers.push(number);
            }
        });
    });
    foundNumbers.forEach(function (number) {
        total[0] += number.value;
    });
    symbols.forEach(function (symbol) {
        if (symbol.symbol == '*') {
            var adjecentNumbers_1 = [];
            var usedNumbers_1 = [];
            numbers.forEach(function (number) {
                var alreadyFound = usedNumbers_1.some(function (foundNumber) {
                    return foundNumber.value === number.value &&
                        foundNumber.lineIndex === number.lineIndex &&
                        foundNumber.startChar === number.startChar &&
                        foundNumber.endChar === number.endChar;
                });
                if (Math.abs(symbol.lineIndex - number.lineIndex) <= 1 &&
                    (Math.abs(symbol.index - number.startChar) <= 1 || Math.abs(symbol.index - number.endChar) <= 1) && !alreadyFound) {
                    adjecentNumbers_1.push(number);
                    usedNumbers_1.push(number);
                }
            });
            if (adjecentNumbers_1.length > 1 && adjecentNumbers_1.length < 3) {
                console.log("Adj: " + adjecentNumbers_1[0].value + "," + adjecentNumbers_1[1].value + " Symbol: " + symbol.symbol + " Line: " + symbol.lineIndex);
                total[1] += (adjecentNumbers_1[0].value * adjecentNumbers_1[1].value);
            }
        }
    });
    return total;
}
//Find the start and end char index of a numbers within a string
function findAllIndices(input, targetNumber) {
    var foundInteger = [];
    var startIndex = input.indexOf(targetNumber);
    while (startIndex !== -1) {
        var endIndex = startIndex + targetNumber.length - 1;
        var beforeChar = startIndex === 0 ? '' : input[startIndex - 1];
        var afterChar = endIndex === input.length - 1 ? '' : input[endIndex + 1];
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
