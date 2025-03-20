import { create } from "zustand";
import { GameState } from "../types/types.ts";

export const useGameStore = create<GameState>((set, get) => ({
  cards: [],
  turnCount: 0,
  selectOne: null,
  selectTwo: null,
  isProcessing: false,
  gameCompleted: false,

  generateShuffledDeck: (difficulty) => {
    const cardEmojis = ["💻", "🖥️", "🖱️", "⌨️", "💾", "🗃️", "📱", "🔌"];
    const cardCountByDifficulty = { easy: 3, medium: 4, hard: 6 };
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
    });
  },

  handleSelect: (card) => {
    const { selectOne, isProcessing, cards } = get();

    if (isProcessing || card.matched || card.flipped) return;

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c,
    );

    if (!selectOne) {
      set({ cards: updatedCards, selectOne: card });
    } else if (selectOne.id !== card.id) {
      set({
        cards: updatedCards,
        selectTwo: card,
        isProcessing: true,
      });
    }
  },

  checkForMatch: () => {
    const { selectOne, selectTwo, cards } = get();

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
  },
}));
