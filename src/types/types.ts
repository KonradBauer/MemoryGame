export type Card = {
  emoji: string;
  id: number;
  matched: boolean;
  flipped: boolean;
};

export type CardProps = {
  card: Card;
  handleSelect: (card: Card) => void;
};

export type GameStats = {
  date: string;
  time: number;
  turns: number;
  difficulty: string;
};

export type GameState = {
  cards: Card[];
  turnCount: number;
  selectOne: Card | null;
  selectTwo: Card | null;
  isProcessing: boolean;
  gameCompleted: boolean;
  time: number;
  isTimerRunning: boolean;
  difficulty: number;

  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;

  generateShuffledDeck: (difficulty: number) => void;
  handleSelect: (card: Card) => void;
  checkForMatch: () => void;
  resetTurn: () => void;
  resetGame: () => void;

  saveGameStats: (difficulty: string) => void;
  getGameStats: () => GameStats[];
};
