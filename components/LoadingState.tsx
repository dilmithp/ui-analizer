
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Initializing UI analysis protocol...",
  "Dispatching design bots to crawl the DOM...",
  "Analyzing color palette and extracting hex codes...",
  "Deconstructing typographic scale...",
  "Mapping component architecture...",
  "Evaluating user flow and interaction patterns...",
  "Compiling the final design document...",
];

export const LoadingState: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 flex flex-col items-center justify-center text-center p-8">
       <div className="relative flex justify-center items-center">
        <div className="absolute w-24 h-24 rounded-full animate-spin border-4 border-dashed border-cyan-500"></div>
        <div className="absolute w-16 h-16 rounded-full animate-spin border-4 border-dashed border-violet-500" style={{animationDirection: 'reverse'}}></div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
        </svg>
      </div>
      <p className="mt-6 text-lg font-semibold text-slate-300 max-w-md">
        {loadingMessages[messageIndex]}
      </p>
      <p className="text-slate-500 mt-2 text-sm">
        This may take a moment. Please wait.
      </p>
    </div>
  );
};
