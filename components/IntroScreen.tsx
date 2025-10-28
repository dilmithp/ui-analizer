
import React from 'react';

export const IntroScreen: React.FC = () => {
    return (
        <div className="mt-12 text-center p-8 bg-slate-800/30 border border-slate-700 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-100">Welcome to the UI Analyzer</h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-400">
                This tool leverages the Gemini Pro model to conduct a thorough analysis of a website's user interface and experience. 
                It deconstructs the visual language of a site—from its color scheme and typography to its layout and component structure.
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-slate-400">
                Enter a URL above (defaults to <span className="font-mono text-cyan-400">enthu.ai</span>) and click "Analyze UI" to generate a detailed design document.
            </p>
        </div>
    );
};
