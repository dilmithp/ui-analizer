
import React, { useState } from 'react';

interface UrlInputFormProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export const UrlInputForm: React.FC<UrlInputFormProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('https://enthu.ai/');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 items-center bg-slate-800/50 p-2 rounded-xl border border-slate-700 shadow-lg">
        <div className="flex-grow w-full relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL"
              className="w-full bg-slate-800 text-slate-100 placeholder-slate-500 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
              disabled={isLoading}
            />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 font-semibold text-white bg-violet-600 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-violet-500 transition-all duration-300 ease-in-out disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? (
             <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
             </>
          ) : 'Analyze UI'}
        </button>
      </div>
    </form>
  );
};
