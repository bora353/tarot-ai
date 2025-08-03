import React from "react";

interface ResultModalProps {
  open: boolean;
  result?: string;
  loading?: boolean;
  error?: string;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({
  open,
  result,
  loading,
  error,
  onClose,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-xl max-h-[80vh] relative flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-pink-700">결과는...</h2>
          <button
            className="text-gray-400 hover:text-pink-500 text-2xl"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {loading && (
          <div className="text-center text-gray-500 py-8 flex-grow">
            AI가 해석 중입니다...
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center py-8 flex-grow">{error}</div>
        )}

        {!loading && !error && result && (
          <div className="flex-grow overflow-y-auto whitespace-pre-line text-gray-800 text-base leading-relaxed pr-2">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultModal;
