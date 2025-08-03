import React from "react";
import type { TarotCard } from "../data/tarotCards";

interface TarotCardProps {
  card: TarotCard;
  onClick?: () => void;
  selected?: boolean;
  flipped?: boolean;
}

const TarotCard: React.FC<TarotCardProps> = ({
  card,
  onClick,
  selected,
  flipped,
}) => {
  const imageUrl = flipped
    ? `/tarot-images/${card.image}`
    : "/tarot-images/back.svg";
  return (
    <div
      className={`w-20 h-32 bg-white rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer border-2 transition-all duration-200 overflow-hidden ${
        selected ? "border-pink-500 scale-110 z-10" : "border-gray-200"
      }`}
      onClick={onClick}
    >
      <div className="w-16 h-24 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={flipped ? card.name : "타로카드 뒷면"}
          className="w-full h-full object-contain"
        />
      </div>
      {flipped && (
        <span className="text-xs font-semibold text-gray-700 mt-1 text-center break-keep">
          {card.name}
        </span>
      )}
    </div>
  );
};

export default TarotCard;
