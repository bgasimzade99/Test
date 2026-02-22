// 1. Deposit some money into the account +
// 2. Collect a bet amount from the user +
// 3. Determine number of lines to bet on +
// 4. Spin the slot machine +
// 5. Check if the user won +
// 6. Give the user their winnings+ 
// 7. Play again+

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

const SYMBOLS_VALUES = { 
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
};

const spin =()=> {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
       for(let  i = 0 ; i < count; i++) {
        symbols.push(symbol);
       }
    } 
    const reels = []; 
    for(let i = 0; i < COLS ; i++) {
        reels.push([]);
        const reelsSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelsSymbols.length);
            const selectedSymbol = reelsSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelsSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};


const deposit =() => { 
    while (true) {
    const depositAmount = prompt("Enter a deposit amount: "); 
    const numberDepositAmount = parseFloat(depositAmount);
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) { 
        console.log("Invalid deposit amount, please try again."); 
    } else { 
        return numberDepositAmount; 
    }
} 
} 
 
const getNumerOfLLienes = () => { 
    while (true) {
    const lines = prompt("Enter a number of lines to bet on(1-3): "); 
    const numberLines = parseFloat(lines);
    if (isNaN(numberLines) || numberLines <= 0 || numberLines > 3) { 
        console.log("Invalid number of lines, please try again."); 
    } else { 

        return numberLines; 
    }
} 

}

const getBet = (balance, lines)=> {
    while (true) {
        const bet = prompt("Enter the bet amount per line: ");
        const numberBet = parseFloat(bet);
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet amount, please try again.");
        } else {
            return numberBet;
        }
    }
}
const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};
const printRows = (rows) => {
    for (const row of rows ) { 
        let rowString = ""; 
        for (const [i, symbol] of row.entries()) { 
            rowString += symbol; 
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    } 
};
 const getWnnings  = (rows, bet, lines) => { 
    let winnings = 0; 
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row]; 
        let allsame = true; 
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allsame = false; 
                break; 
            }

        }
        if (allsame) {
            winnings += SYMBOLS_VALUES[symbols[0]] * bet; 
        }
    }
    return winnings; 
};


const game = () => { 
    let balance = deposit();
    console.log("You have  a balance of $" + balance.toString());
    while (true) {
const numberOfLines = getNumerOfLLienes();
const numberBet = getBet(balance, numberOfLines);
balance -= numberBet * numberOfLines;
console.log("You are betting $" + numberBet + " on " + numberOfLines + " lines. Total bet is equal to: $" + numberBet * numberOfLines);
const reels = spin();
const rows = transpose(reels); 
printRows(rows);
const winnings = getWnnings(rows, numberBet, numberOfLines);
console.log("You won, $" + winnings.toString());
balance += winnings - numberBet * numberOfLines;
console.log("Your balance is $" + balance.toString());  
if (balance <= 0) { 
    console.log("You ran out of money!");
    break; 
} 
const playAgain = prompt("Do you want to play again? (y/n): "); 
if (playAgain != "y") { 
    break;
} 
}
};
game();