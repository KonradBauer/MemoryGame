import { useGameStore } from "../../store/store.ts";
import "./style.scss";

export const Navigation = () => {
  const generateShuffledDeck = useGameStore(
    (state) => state.generateShuffledDeck,
  );

  return (
    <div className="select-level-group">
      <button className="button" onClick={() => generateShuffledDeck("easy")}>
        Easy
      </button>
      <button className="button" onClick={() => generateShuffledDeck("hard")}>
        Hard
      </button>
    </div>
  );
};
