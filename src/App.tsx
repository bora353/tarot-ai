import TarotTable from "./components/TarotTable";
import QuestionSelector from "./components/QuestionSelector";
import { useState } from "react";

function App() {
  // 기본 질문을 비워두고, 사용자가 직접 입력하도록 변경
  const [question, setQuestion] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 bg-gradient-to-b from-yellow-100 to-pink-200 text-center">
      <h1 className="text-4xl font-bold text-pink-700 mb-4">타로카드</h1>
      <p className="text-lg text-pink-600 mb-8 max-w-md">
        궁금한 질문을 떠올리고, 아래 카드를 세 장 뽑아보세요.
      </p>

      {/* 질문 입력 창 */}
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="질문을 입력하세요 :)"
        maxLength={50}
        className="w-[90%] max-w-md p-3 mb-8 text-center text-gray-700 bg-white border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
      />

      <TarotTable question={question} />
    </div>
  );
}

export default App;
