import {ticTacToe} from './game1/index';
import PromptSync from 'prompt-sync';
export const prompt = PromptSync({ sigint: true});


const quit = false; // flag to select another game later on
let closeTerminalSession = false; // flag to end the entire session;

const games = ['Tic Tac Toe'];
const strArr: string[] = games.map((game, index) => (`${index + 1}. ${game}`));
const availableGames:string = strArr.join('\n')

console.log("Welcome to Console Games!");
console.log("Select a game to play (enter the number): \n---------------------------------------\n");
type display = "Main" | "Help";
function displayMainMenu(view: display): void {
    if(view === "Help"){
        console.log("Help Menu");
        console.log("- Select a game by entering the corresponding number.");
        console.log("- If you wish to quit a game enter 'q' when prompted to make any selection.");
        console.log(" - To close the entire terminal session, type 'quit' or simply Enter 'q' when at the main menu.\n")
        return;
    }
    if(view === "Main"){
        console.log("\n------------------- Main Menu -------------------\n");
        console.log("Available Games:\n")
        console.log(availableGames);
        console.log("\nEnter 'h' for Help Menu");
        console.log("Enter 'q' to Quit\n");
    }
    
}


displayMainMenu("Main");
while (!closeTerminalSession){
    const gameSelection = prompt("Your selection: ");

    switch (gameSelection?.trim()?.toLowerCase() ?? '') {
        case 'h':
            displayMainMenu("Help");
            break;

        case 'q':
            console.log("Closing terminal session.\n\nThank you for Playing! \nGoodbye!")
            closeTerminalSession = true;
            break; 
        case 'quit':
            console.log("Closing terminal session.\n\nThank you for Playing! \nGoodbye!")
            closeTerminalSession = true;
            break; 
        case '1':
            ticTacToe();
            displayMainMenu("Main");
            break;
        default:
            console.log("Invalid selection. Please try again.\n\n");
            displayMainMenu("Main");
            break;
    } 
}

// End of session
process.exit(0);

