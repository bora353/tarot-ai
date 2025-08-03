import React from "react";

interface QuestionSelectorProps {
  value: string;
  onChange: (q: string) => void;
}

const MIN_LEN = 5;
const MAX_LEN = 50;

const QuestionSelector: React.FC<QuestionSelectorProps> = ({
  value,
  onChange,
}) => {
  const isTooShort = value.length > 0 && value.length < MIN_LEN;
  const isTooLong = value.length > MAX_LEN;
  return (
    <div className="flex flex-col items-center gap-2 my-4">
      <label className="text-sm text-gray-700 font-semibold mb-1">
        궁금한 점이나 질문을 입력하세요
      </label>
      <input
        type="text"
        className={`border rounded px-3 py-2 w-72 text-base ${
          isTooShort || isTooLong ? "border-red-400" : ""
        }`}
        placeholder="예) 오늘 나에게 필요한 메시지는?"
        value={value}
        maxLength={MAX_LEN}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="text-xs text-gray-500 mt-1">
        (5~50자 이내로 입력하세요)
      </div>
      {isTooShort && (
        <div className="text-xs text-red-500">질문을 5자 이상 입력하세요.</div>
      )}
      {isTooLong && (
        <div className="text-xs text-red-500">
          질문은 50자 이내로 입력해야 합니다.
        </div>
      )}
    </div>
  );
};

export default QuestionSelector;
