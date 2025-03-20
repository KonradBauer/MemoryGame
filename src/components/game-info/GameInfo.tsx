import { useGameStore } from "../../store/store.ts";
import "./style.scss";

export const GameInfo = () => {
  const turnCount = useGameStore((state) => state.turnCount);
  const gameCompleted = useGameStore((state) => state.gameCompleted);
  const generateShuffledDeck = useGameStore(
    (state) => state.generateShuffledDeck,
  );

  return (
    <div className="game-info">
      <div className="turn-counter">Number of tours: {turnCount}</div>
      {gameCompleted && (
        <div className="game-completed">
          Congratulations! You finished the game in {turnCount} turns!
          <button
            className="button play-again"
            onClick={() => generateShuffledDeck("easy")}
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
};
