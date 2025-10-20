// I want a class 'SessionHistory' that can store data about multiple game sessions. 
// Each session is instantiated upon starting a new node terminal sessions of the console games app.
// Each session should be able to store data about multiple games played within that session.
// The history should be accessible throughout the app so that each game can log its results to the session history.
// If possible, I want to implement this using the singleton pattern so that there's only one instance of SessionHistory throughout the app.
interface GameSession{
    gameName: string;
    player: string;
    result: string;
    timestamp: Date;
};
interface TicTacToeScoreboard {
    gameName: string;
    playerX: number;
    playerO: number;
    tieMatches: number;
}
class SessionHistory {
    private static instance: SessionHistory;
    private gameSessions: (GameSession|TicTacToeScoreboard)[] = [];

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
    public logGameSessionHistory(history: GameSession|TicTacToeScoreboard): void {
        this.gameSessions.push(history);
    }
}

export type { SessionHistory, GameSession, TicTacToeScoreboard };
