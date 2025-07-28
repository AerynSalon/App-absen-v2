
import React from 'react';

interface SummaryCardProps {
  summary: string;
  isLoading: boolean;
  onGenerate: () => void;
  hasRecords: boolean;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></div>
    </div>
)

const SummaryCard: React.FC<SummaryCardProps> = ({ summary, isLoading, onGenerate, hasRecords }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Ringkasan AI</h2>
        <button
          onClick={onGenerate}
          disabled={isLoading || !hasRecords}
          className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? <LoadingSpinner /> : (
            <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zM12 11a1 1 0 11-2 0 1 1 0 012 0zM12 7a1 1 0 11-2 0 1 1 0 012 0zM9 11a1 1 0 11-2 0 1 1 0 012 0zM9 7a1 1 0 11-2 0 1 1 0 012 0zM7 11a1 1 0 11-2 0 1 1 0 012 0zM7 7a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            <span>Buat Ulang</span>
            </>
          )}
        </button>
      </div>
      <div className="bg-slate-100 p-4 rounded-lg min-h-[150px] flex items-center justify-center">
        {isLoading ? (
            <div className="text-center text-gray-500">
                <p>AI sedang menganalisis data...</p>
            </div>
        ) : (
          <div className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
            {summary}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
