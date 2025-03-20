import { create } from "zustand";
import { Card, GameState, GameStats } from "../types/types.ts";

export const useGameStore = create<GameState>((set, get) => {
  let timer: number | null = null;

  const saveGameStats = (difficulty: string) => {
    const { time, turnCount } = get();

    const newGameStats: GameStats = {
      date: new Date().toISOString(),
      time,
      turns: turnCount,
      difficulty,
    };

    const existingStatsJSON = localStorage.getItem("gameStats");
    let gameStats: GameStats[] = [];

    if (existingStatsJSON) {
      try {
        gameStats = JSON.parse(existingStatsJSON);
      } catch (error) {
        console.error("Błąd podczas parsowania statystyk gry:", error);
      }
    }

    gameStats.push(newGameStats);
    localStorage.setItem("gameStats", JSON.stringify(gameStats));
  };

  const getGameStats = (): GameStats[] => {
    const statsJSON = localStorage.getItem("gameStats");
    if (statsJSON) {
      try {
        return JSON.parse(statsJSON);
      } catch (error) {
        console.error("Błąd podczas pobierania statystyk gry:", error);
        return [];
      }
    }
    return [];
  };

  return {
    cards: [],
    turnCount: 0,
    selectOne: null,
    selectTwo: null,
    isProcessing: false,
    gameCompleted: false,
    time: 0,
    isTimerRunning: false,
    difficulty: "easy",

    saveGameStats,
    getGameStats,

    startTimer: () => {
      if (!get().isTimerRunning) {
        set({ isTimerRunning: true });
        timer = setInterval(() => {
          set((state) => ({ time: state.time + 1 }));
        }, 1000);
      }
    },

    stopTimer: () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
        set({ isTimerRunning: false });
      }
    },

    resetTimer: () => {
      if (timer) clearInterval(timer);
      set({ time: 0, isTimerRunning: false });
    },

    generateShuffledDeck: (difficulty: "easy" | "hard") => {
      const cardEmojis = ["🚀", "📌", "🖱️", "⌨️", "💾", "֎🇦🇮"];
      const cardCountByDifficulty: Record<"easy" | "hard", number> = {
        easy: 3,
        hard: 6,
      };

      const selectedEmojis = cardEmojis.slice(
        0,
        cardCountByDifficulty[difficulty],
      );

      const shuffledDeck = [...selectedEmojis, ...selectedEmojis]
        .sort(() => Math.random() - 0.5)
        .map((emoji) => ({
          emoji,
          id: Math.random(),
          matched: false,
          flipped: false,
        }));

      set({
        cards: shuffledDeck,
        turnCount: 0,
        selectOne: null,
        selectTwo: null,
        gameCompleted: false,
        difficulty,
      });

      get().resetTimer();
    },

    handleSelect: (card: Card) => {
      const { selectOne, isProcessing, cards, startTimer } = get();

      if (isProcessing || card.matched || card.flipped) return;

      const updatedCards = cards.map((c) =>
        c.id === card.id ? { ...c, flipped: true } : c,
      );

      if (!selectOne) {
        set({ cards: updatedCards, selectOne: card });
        startTimer();
      } else if (selectOne.id !== card.id) {
        set({
          cards: updatedCards,
          selectTwo: card,
          isProcessing: true,
        });
      }
    },

    checkForMatch: () => {
      const { selectOne, selectTwo, cards, stopTimer, difficulty } = get();

      if (selectOne && selectTwo) {
        if (selectOne.emoji === selectTwo.emoji) {
          const matchSound = new Audio("/audio/match.mp3");
          matchSound.play();
          const updatedCards = cards.map((card) => {
            if (card.emoji === selectOne.emoji) {
              return { ...card, matched: true };
            }
            return card;
          });

          set({ cards: updatedCards });
          const allMatched = updatedCards.every((card) => card.matched);
          if (allMatched) {
            set({ gameCompleted: true });
            stopTimer();

            get().saveGameStats(difficulty);
            const win = new Audio("/audio/yay.mp3");
            win.play();
          }
        } else {
          setTimeout(() => {
            const resetFlippedCards = cards.map((card) => {
              if (card.id === selectOne.id || card.id === selectTwo.id) {
                return { ...card, flipped: false };
              }
              return card;
            });
            set({ cards: resetFlippedCards });
          }, 1000);
        }

        setTimeout(() => {
          get().resetTurn();
        }, 1000);
      }
    },

    resetTurn: () => {
      set((state) => ({
        selectOne: null,
        selectTwo: null,
        turnCount: state.turnCount + 1,
        isProcessing: false,
      }));
    },

    resetGame: () => {
      set({
        cards: [],
        turnCount: 0,
        selectOne: null,
        selectTwo: null,
        isProcessing: false,
        gameCompleted: false,
      });

      get().resetTimer();
    },
  };
});
