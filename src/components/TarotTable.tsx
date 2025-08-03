import React, { useState } from "react";
import { tarotCards } from "../data/tarotCards";
import TarotCard from "./TarotCard";
import ResultModal from "./ResultModal";

const CARD_RADIUS = 180; // 카드가 펼쳐질 반지름(px)

interface TarotTableProps {
  question: string;
}

const TarotTable: React.FC<TarotTableProps> = ({ question }) => {
  const [selected, setSelected] = useState<number[]>([]);
  // 알림 메시지용 상태를 추가합니다.
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  // 알림 메시지 상태 추가
  const [modalMessage, setModalMessage] = useState<string | undefined>(
    undefined
  );

  const centerX = 250;
  const centerY = 200;
  const total = tarotCards.length;

  const handleCardClick = (id: number) => {
    if (!question) {
      // alert 대신 모달로 메시지를 표시합니다.
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
      // alert 대신 모달로 메시지를 표시합니다.
      setModalMessage("질문을 먼저 입력해 주세요.");
      setModalOpen(true);
      return;
    }

    // API 호출 전 기존 모달 상태 초기화
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
        throw new Error(`서버 오류: ${text}`);
      }

      const data = JSON.parse(text);
      setResult(data.result);
      console.log("API 호출 성공!");
    } catch (e: any) {
      console.error("API 호출 중 오류 발생:", e);
      setError(e.message || "AI 해석에 실패했습니다.");
    } finally {
      setLoading(false);
      console.log("로딩 상태가 false로 변경되었습니다.");
    }
  };

  const canClickAnyCard = !!question;

  return (
    <div className="relative w-[500px] h-[400px] mx-auto my-8 flex items-center justify-center">
      {/* 안내 문구 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 text-base font-semibold text-pink-700 bg-white/80 px-4 py-1 rounded shadow">
        카드는 3장만 뽑으세요
      </div>
      {/* 해석하기 버튼 */}
      <button
        className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-pink-500 text-white font-bold px-6 py-2 rounded shadow disabled:bg-gray-300 disabled:text-gray-400 transition"
        disabled={selected.length !== 3 || loading || !question}
        onClick={handleInterpret}
        style={{ zIndex: 20 }}
      >
        해석하기
      </button>
      {/* 원형 배경 이미지 */}
      <img
        src="/tarot-images/circle_bg.png"
        alt="원형 배경"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] pointer-events-none opacity-80"
        style={{ zIndex: 0 }}
      />
      {/* 카드들 */}
      {tarotCards.map((card, i) => {
        const angle = Math.PI * 2 * (i / total) - Math.PI / 2;
        const x = centerX + CARD_RADIUS * Math.cos(angle) - 40;
        const y = centerY + CARD_RADIUS * Math.sin(angle) - 64;
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
              opacity: canClickAnyCard ? (isCardActive ? 1 : 0.5) : 0.5,
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
      {/* 해석 결과 모달 */}
      <ResultModal
        open={modalOpen}
        // 알림 메시지를 result prop으로 전달
        result={result || modalMessage}
        loading={loading}
        error={error}
        // 모달 닫기 버튼 누르면 초기화
        onClose={() => {
          setModalOpen(false);
          setModalMessage(undefined);
        }}
      />
    </div>
  );
};

export default TarotTable;
