import {ticTacToe} from './game1/index';
const prompt = require('prompt-sync')();


const quit = false; // flag to select another game later on
const closeTerminalSession = false; // flag to end the entire session;

const games = ['Tic Tac Toe'];

console.log("Welcome to Console Games!");
console.log("1. Tic Tac Toe");
console.log("Select a game to play (enter the number): ");



while (!closeTerminalSession){
    const availableGames:string = games.map((game, index) => (`${index + 1}. ${game}\n`)).join('');
    const gameSelection = prompt(`Available Games:\n${availableGames}Your selection: `);

    switch (gameSelection.trim()) {
        case '1':
            ticTacToe();
            break;
        default:
            console.log("Invalid selection. Please try again.");
    } 
}
