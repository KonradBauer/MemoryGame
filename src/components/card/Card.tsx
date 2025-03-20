import { CardProps } from "../../types/types.ts";
import "./style.scss";

export const Card = ({ card, handleSelect }: CardProps) => {
  const handleClick = () => {
    handleSelect(card);
  };

  return (
    <div
      className={`card ${card.matched && "matched"} ${card.flipped && "flipped"}`}
      onClick={handleClick}
    >
      <div className="card-content">
        <div className="card-front">?</div>
        <div className="card-back">{card.emoji}</div>
      </div>
    </div>
  );
};
