import { useGameStore } from "../../store/store.ts";
import "./style.scss";

export const Stats = () => {
  const getGameStats = useGameStore((state) => state.getGameStats);
  const gameStats = getGameStats();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const formatDifficulty = (difficulty: string) => {
    return difficulty === "easy" ? "Easy" : "Hard";
  };

  return (
    <div className="stats-container">
      <h2>Game History</h2>

      {gameStats.length === 0 ? (
        <div className="empty-stats">No game statistics saved</div>
      ) : (
        <div className="stats-list">
          {gameStats.map((stat, index) => (
            <div key={index} className="stats-item">
              <div className="stat-row">
                <span className="label">Date:</span>
                <span>{new Date(stat.date).toLocaleString()}</span>
              </div>
              <div className="stat-row">
                <span className="label">Time:</span>
                <span>{formatTime(stat.time)}</span>
              </div>
              <div className="stat-row">
                <span className="label">Number of Moves:</span>
                <span>{stat.turns}</span>
              </div>
              <div className="stat-row">
                <span className="label">Difficulty Level:</span>
                <span className={`difficulty-${stat.difficulty}`}>
                  {formatDifficulty(stat.difficulty)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
