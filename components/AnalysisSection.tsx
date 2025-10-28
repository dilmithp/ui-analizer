
import React from 'react';

interface AnalysisSectionProps {
  title: string;
  children: React.ReactNode;
}

export const AnalysisSection: React.FC<AnalysisSectionProps> = ({ title, children }) => {
  return (
    <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 pb-1 border-b-2 border-slate-700">
        {title}
      </h3>
      <div className="mt-4">
        {children}
      </div>
    </section>
  );
};
