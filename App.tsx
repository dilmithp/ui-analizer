
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UrlInputForm } from './components/UrlInputForm';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { LoadingState } from './components/LoadingState';
import { analyzeWebsiteUI } from './services/geminiService';
import type { AnalysisResult } from './types';
import { IntroScreen } from './components/IntroScreen';

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [analyzedUrl, setAnalyzedUrl] = useState<string>('');

  const handleAnalyze = useCallback(async (url: string) => {
    setShowIntro(false);
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setAnalyzedUrl(url);

    try {
      const result = await analyzeWebsiteUI(url);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <Header />
        <main className="mt-8">
          <UrlInputForm onAnalyze={handleAnalyze} isLoading={isLoading} />
          
          {error && (
            <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
              <p className="font-bold">Analysis Failed</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {showIntro && !isLoading && !analysisResult && <IntroScreen />}
          {isLoading && <LoadingState />}
          {analysisResult && !isLoading && <AnalysisDisplay result={analysisResult} url={analyzedUrl} />}
        </main>
      </div>
    </div>
  );
};

export default App;
