import { SessionHistory, TicTacToeScoreboard } from "../classes";
import { prompt } from '../index';

function ticTacToe(): void {
    console.log("Welcome to Tic Tac Toe!");
    // Game logic would go here
    
    type Winner = 'X' | 'O' | 'Tie' | null;
    type Player = Extract <Winner, 'X' | 'O'>;
    
    let currentPlayer: Player = 'X';
    let winner: Winner = null;
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

    function printBoard(gameOver = false): void {
       if(gameOver){
            console.log('\n--------------------------------------------------------------');
            console.log("Scoreboard:")
            console.log(`Player X: ${scoreBoard.playerX}, Player O: ${scoreBoard.playerO}, Ties: ${scoreBoard.tieMatches}`);
            console.log('--------------------------------------------------------------\n');
       }
       else{
           console.log('--------------------------------------------------------------');
           console.log(`Current turn: Player: ${currentPlayer}. Turn number: ${turnCounter + 1}, \nScoreboard:`)
           console.log(`Player X: ${scoreBoard.playerX}, Player O: ${scoreBoard.playerO}, Ties: ${scoreBoard.tieMatches}`);
           console.log('--------------------------------------------------------------');
       }
        console.log("Current Board:\n\n")
        board.forEach((row, index) =>{
            console.log(`row: ${index} `,row.join(' | '))
            if(index < 2) console.log('       -----------')
        })
    }

    function evaluateWinner(): void {
        if(turnCounter < 5) return;
        let colValues: (Player | " ")[][] = [[],[],[]];
        // Check rows and build columns for current player
        board.some((row, rowIndex) =>{
            if(row.every( spot => spot === currentPlayer)){
                winner = currentPlayer;
                if(winner === 'X') scoreBoard.playerX += 1;
                else scoreBoard.playerO += 1;
                console.log(`Player ${winner} wins!`);
                return true;
            }
            row.forEach((spot, colIndex) =>{
                colValues[colIndex]![rowIndex] = spot as Player | " ";
            })
        })
        // Check columns
        colValues.some( col =>{
            if(col.every( spot => spot === currentPlayer)){
                winner = currentPlayer;
                if(winner === 'X') scoreBoard.playerX += 1;
                else scoreBoard.playerO += 1;
                console.log(`Player ${winner} wins!`);
                return true;
            }
        })
        // Check diagonals
        if( (board[0]![0] === currentPlayer && board[1]![1] === currentPlayer && board[2]![2] === currentPlayer) ||
            (board[0]![2] === currentPlayer && board[1]![1] === currentPlayer && board[2]![0] === currentPlayer) ){
                winner = currentPlayer;
                if(winner === 'X') scoreBoard.playerX += 1;
                else scoreBoard.playerO += 1;
                console.log(`Player ${winner} wins!`);
        }
        // Check for tie
        if(turnCounter === 9){
            winner = 'Tie';
            scoreBoard.tieMatches += 1;
            console.log("The game is a tie!");
        }
        if(winner !== null){
            printBoard(true)
        }
    }
    while( !forfeit && turnCounter <9 && winner === null){
        printBoard();
        const move = prompt(`Player ${currentPlayer}, enter your move as row,col ( Enter 'f' to Forfeit or 'q' to Quit): `);
        if(move.toLowerCase() === 'f' || move.toLowerCase() === 'q'){
            console.log("Forfeiting or Quitting the game gives the win to the other player.")
            const doubleCheck = prompt("Enter 'y' to confirm, Enter any other key to continue playing: ");
            if(doubleCheck.toLowerCase() === 'y'){
                foreitGame(currentPlayer);
                break;
            }
            else {
                continue;
            } 
        }
        const [row, col] = move.split(',').map((num: string)=> parseInt(num.trim())) as [number, number];

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
            evaluateWinner();
            currentPlayer = (currentPlayer) === 'X'? 'O' : 'X'
        }
    }
    SessionHistory.getInstance().logGameSessionHistory(scoreBoard);

    const playAgain = prompt("Game over! Would you like to play another game of Tic Tac Toe? (y/n): ");
    if(playAgain.toLowerCase() === 'y'){
        ticTacToe();
    }
    
    return;
};

export { ticTacToe };