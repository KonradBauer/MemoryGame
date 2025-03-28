import { useEffect } from "react";
import Confetti from "react-confetti-boom";
import { Navigation } from "./components/navigation/Navigation.tsx";
import { GameInfo } from "./components/game-info/GameInfo.tsx";
import { CardsContainer } from "./components/cards-container/CardsContainer.tsx";
import { Timer } from "./components/timer/Timer.tsx";
import { Stats } from "./components/stats/Stats.tsx";
import { Modal } from "./components/modal/Modal";
import { useGameStore } from "./store/store.ts";
import "./app.scss";
import "./styles/root.scss";

function App() {
  const selectOne = useGameStore((state) => state.selectOne);
  const selectTwo = useGameStore((state) => state.selectTwo);
  const gameCompleted = useGameStore((state) => state.gameCompleted);
  const checkForMatch = useGameStore((state) => state.checkForMatch);

  useEffect(() => {
    if (selectOne && selectTwo) {
      checkForMatch();
    }
  }, [selectOne, selectTwo, checkForMatch]);

  return (
    <div className="global-container">
      <Modal>
        <Stats />
      </Modal>
      {gameCompleted && <Confetti mode="fall" />}
      <h1>Memory Game</h1>
      <Navigation />
      <Timer />
      <GameInfo />
      <CardsContainer />
    </div>
  );
}

export default App;
