
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 pb-2">
        UI Analyzer
      </h1>
      <p className="text-slate-400 mt-2 text-lg">
        Generate a complete design document for any website using Gemini.
      </p>
    </header>
  );
};
