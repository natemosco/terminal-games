import { TicTacToeScoreboard } from "../classes";

function ticTacToe(): void {
    console.log("Welcome to Tic Tac Toe!");
    // Game logic would go here

    let scoreBoard: TicTacToeScoreboard = { gameName: 'Tic Tac Toe', playerX: 0, playerO: 0, tieMatches: 0 };
    let foreit = false;

    let currentPlayer: 'X' | 'O' = 'X';
    const board: string[][] = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];



    // I want to export the scoreboard so that the main index.ts file can access the data even after the game ends
    // or if the user quits mid-game; quitting mid-game is counted as a loss for the quitting player;
    // ties are counted when the board is full with no winner
    
    // For now, just a placeholder return
    return;
};

export { ticTacToe };