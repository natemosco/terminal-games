import { SessionHistory, TicTacToeScoreboard } from "../classes";

function ticTacToe(): void {
    console.log("Welcome to Tic Tac Toe!");
    // Game logic would go here
    
    let currentPlayer: 'X' | 'O' = 'X';
    let scoreBoard: TicTacToeScoreboard = SessionHistory.getInstance().getSessionHistory("Tic Tac Toe") as TicTacToeScoreboard;
    type Row = [string, string, string];
    type Board = [Row, Row, Row];
    let board: Board = [
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
        console.log(`Current turn: Player: ${currentPlayer}. Turn number: ${turnCounter + 1}, /n Scoreboard: 
            Player X: ${scoreBoard.playerX}, Player O: ${scoreBoard.playerO}, Ties: ${scoreBoard.tieMatches}`);
        console.log('--------------------------------------------------------------');
        console.log("Current Board:/n/n")
        board.forEach((row, index) =>{
            console.log(`row: ${index} `,row.join(' | '))
            console.log('--------------')
        })
    }


    while( !forfeit && turnCounter <9 ){
        printBoard();
        const prompt = require('prompt-sync')();
        const move = prompt(`Player ${currentPlayer}, enter your move as row,col (or type 'forfeit' or 'f' to forfeit): `);
        if(move.toLowerCase() === 'forfeit' || move.toLowerCase() === 'f'){
            console.log("Forfeiting the game gives the win to the other player.")
            prompt("Enter 'y' to confirm forfeiting, or any other key to continue playing: ");
            if(prompt.toLowerCase() === 'y'){
                foreitGame(currentPlayer);
                break;
            }
            else {
                continue;
            } 
        }
        const [row, col] = move.split(',').map((num: string)=> parseInt(num.trim()));
        if( isNaN(row) || isNaN(col)  || row < 0 || row > 2 || col < 0 || col > 2 ){
            console.log("Invalid move. Please enter row and column as numbers between 0-2 in the following format: row,column i.e. 0,1");
                continue;
        }
        else if( board[row]![col] !== ' ' ){
            console.log("This spot is already taken. Please choose another spot.");
            continue;
        }
        else{
            board[row]![col] = currentPlayer;
            turnCounter += 1;
            currentPlayer = (currentPlayer) === 'X'? 'O' : 'X'
        }
    }
    SessionHistory.getInstance().logGameSessionHistory(scoreBoard);

    let anotherGamePrompt = require('prompt-sync')();
    const playAgain = anotherGamePrompt("Game over! Would you like to play another game of Tic Tac Toe? (y/n): ");
    if(playAgain.toLowerCase() === 'y'){
        ticTacToe();
    }
    
    return;
};

export { ticTacToe };