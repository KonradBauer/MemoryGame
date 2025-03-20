export type CardItem = {
  emoji: string;
  id: number;
  matched: boolean;
  flipped: boolean;
};

export type GameState = {
  cards: CardItem[];
  turnCount: number;
  selectOne: CardItem | null;
  selectTwo: CardItem | null;
  isProcessing: boolean;
  gameCompleted: boolean;
  generateShuffledDeck: (difficulty: "easy" | "medium" | "hard") => void;
  handleSelect: (card: CardItem) => void;
  resetTurn: () => void;
  checkForMatch: () => void;
  resetGame: () => void;
};

export type CardProps = {
  card: CardItem;
  handleSelect: (card: CardItem) => void;
};
