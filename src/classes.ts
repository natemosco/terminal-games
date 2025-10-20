// I want a class 'SessionHistory' that can store data about multiple game sessions. 
// Each session is instantiated upon starting a new node terminal sessions of the console games app.
// Each session should be able to store data about multiple games played within that session.
// The history should be accessible throughout the app so that each game can log its results to the session history.
// If possible, I want to implement this using the singleton pattern so that there's only one instance of SessionHistory throughout the app.
export interface GameSession{
    gameName: string;
    player: string;
    result: string;
    timestamp: Date;
};
export interface TicTacToeScoreboard {
    gameName: string;
    playerX: number;
    playerO: number;
    tieMatches: number;
}
type Games = "Tic Tac Toe" | "Generic Game";
class SessionHistory {
    private static instance: SessionHistory;
    //this needs to be an object that can store different types of game session data

    private gameSessions: Record <Games, GameSession[] | TicTacToeScoreboard >= {
        "Tic Tac Toe": {gameName: "Tic Tac Toe", playerX: 0, playerO: 0, tieMatches: 0},
        "Generic Game": []
    };

    private constructor() {
        // Private constructor to prevent instantiation
        // so when the app spins up theres automatically one instance of SessionHistory
    }

    public static getInstance(): SessionHistory {
        if (!SessionHistory.instance) {
            // shouldnt be necessary but just in case
            SessionHistory.instance = new SessionHistory();
        }
        return SessionHistory.instance;
    }

    // type guard to determine what type of game session data is being logged
    private isGameSessionArray(value: GameSession[] | TicTacToeScoreboard): value is GameSession[] {
        return Array.isArray(value);
    }
    
    public logGameSessionHistory(history: GameSession|TicTacToeScoreboard): void {
        switch(history.gameName){
            case "Tic Tac Toe":
                this.gameSessions["Tic Tac Toe"] = history as TicTacToeScoreboard;
                break;
            default:
                const genericGameSessions = this.gameSessions["Generic Game"];
                if(this.isGameSessionArray(genericGameSessions)){
                    genericGameSessions.push(history as GameSession)
                }
        }
    }
}

export { SessionHistory };
