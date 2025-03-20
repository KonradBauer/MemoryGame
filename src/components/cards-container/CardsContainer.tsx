import { Card } from "../card/Card.tsx";
import { useGameStore } from "../../store/store.ts";
import "./style.scss";

export const CardsContainer = () => {
  const cards = useGameStore((state) => state.cards);
  const handleSelect = useGameStore((state) => state.handleSelect);

  return (
    <div className="cards-layout">
      {cards.map((card) => (
        <Card key={card.id} card={card} handleSelect={handleSelect} />
      ))}
    </div>
  );
};
