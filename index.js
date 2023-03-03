const numAlphTable = require("./num-alph-table");
const mock1 = "3 234 000.34";

function parseNumericString(string) { // returns object representing parsed string
    const parsedString = string.trim().replaceAll(" ", "").split(".");
    let integer = parsedString[0].split("").reverse().join("");
    const triplets = Math.ceil(integer.length / 3);
    const integerParsed = [];
    for (let i = 0; i < triplets; i++) {
        integerParsed.push(integer.substring(i*triplets, i*triplets + triplets));
    }
    const numberObj = {
        decimal: parsedString[1],
        integer: integerParsed.map(s => s.split("").reverse().join("")).map(s => parseInt(s)),
    }
    return numberObj;
}

function convertDecimal(decimal) {
    const tokens = [];
    for (const d of decimal) {
        tokens.push(numAlphTable[d]);
    }
    return tokens.join(" ");
}

function convertInteger(k) {
    let int = k;
    const tokens = [];
    if (int > 0) {
        const hund = Math.floor(int / 100);
        tokens.unshift(`${numAlphTable[hund]} hundred`);
        int %= 100;
    }
    if (int > 0) {
        const tent = Math.floor(int / 10) * 10;
        tokens.unshift(`${numAlphTable[tent]}`);
        int %= 10;
    }
    if (int > 0) {
        tokens.unshift(`${numAlphTable[int]}`);
    }
    return tokens.join(" ");
}

const num = parseNumericString(mock1);
const parsedDec = convertDecimal(num.decimal);
const number = [];
for (const n of num.integer) {
    number.push(convertInteger(n));
}
console.log(parsedDec);
console.log(number);


/**
 *   3 234 537 - 537 234 3
 *               012 345 6
 *   
 *      
 * 
 * 
 *  312 432 789
 *  012 345 678
 */