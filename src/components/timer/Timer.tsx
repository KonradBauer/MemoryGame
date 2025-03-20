import { useGameStore } from "../../store/store.ts";
import "./style.scss";

export const Timer = () => {
  const { time } = useGameStore();

  return (
    <div className="timer">
      <h2>Czas: {time}s</h2>
    </div>
  );
};
