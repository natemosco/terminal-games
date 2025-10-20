import { TicTacToeScoreboard } from "../classes";

function ticTacToe(): void {
    console.log("Welcome to Tic Tac Toe!");
    // Game logic would go here
    
    let currentPlayer: 'X' | 'O' = 'X';
    let scoreBoard: TicTacToeScoreboard = { gameName: 'Tic Tac Toe', playerX: 0, playerO: 0, tieMatches: 0 };
    let board: string[][] = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    let forfeit = false;
    let turnCounter = 0;

    function ResetBoard(): void {
        board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
        turnCounter = 0;
        forfeit = false;
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }

    function foreitGame(player: 'X' | 'O'): void {
        forfeit = true;
        if (player === 'X'){
            scoreBoard.playerO += 1;
            ResetBoard();
            console.log("Player X has forfeited the game. Player O wins!");
        }
        else {
            scoreBoard.playerX += 1;
            ResetBoard();
            console.log("Player O has forfeited the game. Player X wins!");
        }
    }

    function printBoard(): void {
        console.log("Current Board:/n")
        board.forEach((row, index) =>{
            console.log(`row: ${index} `,row.join(' | '))
            console.log('--------------')
        })
    }


    

    
    return;
};

export { ticTacToe };