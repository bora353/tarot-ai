// components/TarotTable.tsx

import React, { useEffect, useRef, useState } from "react";
import { tarotCards } from "../data/tarotCards";
import TarotCard from "./TarotCard";
import ResultModal from "./ResultModal";

const CARD_RADIUS = 180; // 카드가 펼쳐질 반지름(px)

interface TarotTableProps {
  question: string;
}

// Fisher-Yates 셔플 알고리즘 함수
const shuffleArray = (array: TarotCard[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const TarotTable: React.FC<TarotTableProps> = ({ question }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [modalMessage, setModalMessage] = useState<string | undefined>(undefined);
  const [shuffledCards, setShuffledCards] = useState<TarotCard[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const total = tarotCards.length;

  useEffect(() => {
    setShuffledCards(shuffleArray(tarotCards));
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setCenter({ x: offsetWidth / 2, y: offsetHeight / 2 });
    }
  }, []);


  const handleCardClick = (id: number) => {
    if (!question) {
      setModalMessage("질문을 먼저 입력해 주세요.");
      setModalOpen(true);
      return;
    }
    
    if (selected.length >= 3) return;
    if (!selected.includes(id)) {
      setSelected([...selected, id]);
    }
  };

  const handleInterpret = async () => {
    if (!question) {
      setModalMessage("질문을 먼저 입력해 주세요.");
      setModalOpen(true);
      return;
    }
    
    setModalMessage(undefined);
    setModalOpen(true);
    setLoading(true);
    setError(undefined);
    setResult(undefined);
  
    try {
      console.log("해석 버튼이 클릭되었습니다. API 호출을 시작합니다.");
      const selectedCards = tarotCards.filter((c) => selected.includes(c.id));
      const res = await fetch("/api/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, cards: selectedCards }),
      });
  

      const text = await res.text();

      if (!res.ok) {
        if (res.status === 429) {
          setError("AI가 너무 바빠요! 잠시 후 다시 시도해 주세요.");
        } else {
          // 429 에러가 아닐 경우, 기존 오류 메시지를 사용합니다.
          throw new Error(`서버 오류: ${text}`);
        }
      }
      const data = JSON.parse(text);
      setResult(data.result);
      console.log("API 호출 성공!");
    } catch (e: any) {
      console.error("API 호출 중 오류 발생:", e);
      setError(e.message || "AI 해석에 실패했습니다. (응답 형식을 확인하세요.)");
    } finally {
      setLoading(false);
      console.log("로딩 상태가 false로 변경되었습니다.");
    }
  };

  const canClickAnyCard = !!question;

  return (
    <div
    ref={containerRef}
    className="relative w-full max-w-[500px] h-[400px] mx-auto my-8 flex items-center justify-center"
  >
    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 text-base font-semibold text-pink-700 bg-white/80 px-4 py-1 rounded shadow">
        카드는 3장만 뽑으세요
      </div>
      <button
        className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-pink-500 text-white font-bold px-6 py-2 rounded shadow disabled:bg-gray-300 disabled:text-gray-400 transition"
        disabled={selected.length !== 3 || loading || !question}
        onClick={handleInterpret}
        style={{ zIndex: 20 }}
      >
        해석하기
      </button>
      {shuffledCards.map((card, i) => {
        const angle = Math.PI * 2 * (i / total) - Math.PI / 2;
        const x = center.x + CARD_RADIUS * Math.cos(angle) - 40;
        const y = center.y + CARD_RADIUS * Math.sin(angle) - 64;
        const flipped = selected.includes(card.id);
        const isCardActive = !flipped && selected.length < 3;

        return (
          <div
            key={card.id}
            style={{
              position: "absolute",
              left: x,
              top: y,
              zIndex: flipped ? 10 : 1,
              opacity: selected.includes(card.id) ? 1 : (selected.length >= 3 && !selected.includes(card.id) ? 0.5 : 1),
            }}
          >
            <TarotCard
              card={card}
              onClick={() => handleCardClick(card.id)}
              selected={flipped}
              flipped={flipped}
            />
          </div>
        );
      })}
      <ResultModal
        open={modalOpen}
        result={result || modalMessage}
        loading={loading}
        error={error}
        onClose={() => {
          setModalOpen(false);
          setModalMessage(undefined);
        }}
      />
    </div>
  );
};

export default TarotTable;