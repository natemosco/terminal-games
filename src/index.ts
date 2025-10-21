import {ticTacToe} from './game1/index';
import PromptSync from 'prompt-sync';
export const prompt = PromptSync({ sigint: true});


const quit = false; // flag to select another game later on
let closeTerminalSession = false; // flag to end the entire session;

const games = ['Tic Tac Toe'];

console.log("Welcome to Console Games!");
console.log("Select a game to play (enter the number): \n---------------------------------------\n");



while (!closeTerminalSession){
    const availableGames:string = games.map((game, index) => (`${index + 1}. ${game}\n`)).join('');
    const gameSelection = prompt(`Available Games:\n${availableGames}\nH for Help\n Your selection: `);

    switch (gameSelection?.trim()?.toLowerCase() ?? '') {
        case 'h':
            console.log("Help Menu:\n - Select a game by entering the corresponding number.\n - If you wish to quit a game enter 'q' when prompted to make any selection.")
            console.log(" - To close the entire terminal session, type 'quit' or simply 'q' when at the main menu.\n")
            break;

        case 'q':
            console.log("Closing terminal session.\n Thank you for Playing! \nGoodbye!")
            closeTerminalSession = true;
            break; 
        case 'quit':
            console.log("Closing terminal session.\n Thank you for Playing! \nGoodbye!")
            closeTerminalSession = true;
            break; 
        case '1':
            ticTacToe();
            break;
        default:
            console.log("Invalid selection. Please try again.");
    } 
}

// End of session
process.exit(0);

