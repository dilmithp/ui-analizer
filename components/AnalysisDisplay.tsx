
import React from 'react';
import type { AnalysisResult, ColorInfo, KeyComponent, TypographyScaleItem } from '../types';
import { AnalysisSection } from './AnalysisSection';
import { generateMarkdownReport, downloadReport } from '../reportGenerator';

interface AnalysisDisplayProps {
  result: AnalysisResult;
  url: string;
}

const ColorPalette: React.FC<{ colors: ColorInfo[] }> = ({ colors }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {colors.map((color) => (
      <div key={color.hex} className="p-4 rounded-lg bg-slate-800 border border-slate-700">
        <div className="flex items-center gap-3 mb-2">
            <div
            className="w-8 h-8 rounded-full border-2 border-slate-600"
            style={{ backgroundColor: color.hex }}
            />
            <div>
                <p className="font-semibold text-white">{color.name}</p>
                <p className="text-sm font-mono text-cyan-400">{color.hex}</p>
            </div>
        </div>
        <p className="text-sm text-slate-400 mt-2">{color.usage}</p>
      </div>
    ))}
  </div>
);

const TypographyScale: React.FC<{ scale: TypographyScaleItem[] }> = ({ scale }) => (
    <div className="space-y-4">
      {scale.map((item) => (
        <div key={item.element} className="p-4 rounded-lg bg-slate-800 border border-slate-700">
          <p className="text-lg font-bold text-white mb-2">{item.element}</p>
          <p 
            className="text-2xl truncate"
            style={{ 
              fontFamily: item.fontFamily.includes(' ') ? `"${item.fontFamily}", sans-serif` : `${item.fontFamily}, sans-serif`,
              fontSize: item.fontSize,
              fontWeight: item.fontWeight
            }}
          >
            The quick brown fox jumps over the lazy dog.
          </p>
          <div className="mt-3 text-xs text-slate-400 grid grid-cols-3 gap-2">
            <span>{item.fontFamily}</span>
            <span>{item.fontSize}</span>
            <span>FW: {item.fontWeight}</span>
          </div>
        </div>
      ))}
    </div>
);

const KeyComponents: React.FC<{ components: KeyComponent[] }> = ({ components }) => (
    <div className="space-y-4">
      {components.map((component) => (
        <div key={component.name} className="p-4 rounded-lg bg-slate-800 border border-slate-700">
          <h4 className="font-bold text-lg text-violet-400">{component.name}</h4>
          <p className="text-slate-300 mt-1 whitespace-pre-wrap">{component.description}</p>
        </div>
      ))}
    </div>
);


export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result, url }) => {
  const handleDownload = () => {
    const markdownContent = generateMarkdownReport(result, url);
    try {
      const domain = new URL(url).hostname;
      downloadReport(markdownContent, `ui-analysis-${domain}.md`);
    } catch (e) {
      console.error("Invalid URL for filename generation:", url);
      downloadReport(markdownContent, `ui-analysis-report.md`);
    }
  };

  return (
    <div className="mt-10 animate-fade-in space-y-8">
      <div className="flex justify-between items-center mb-4 -mt-4">
        <h2 className="text-xl font-bold text-slate-300">Analysis Report</h2>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-violet-600 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-violet-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          aria-label="Download analysis report as Markdown"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Report
        </button>
      </div>

      <AnalysisSection title="Color Palette">
        <ColorPalette colors={result.colorPalette} />
      </AnalysisSection>

      <AnalysisSection title="Typography">
        <div className="mb-4">
            <p><strong className="text-violet-400">Primary Font:</strong> {result.typography.primaryFont}</p>
            {result.typography.secondaryFont && <p><strong className="text-violet-400">Secondary Font:</strong> {result.typography.secondaryFont}</p>}
        </div>
        <TypographyScale scale={result.typography.scale} />
      </AnalysisSection>

      <AnalysisSection title="Layout & Structure">
        <p className="text-slate-300 whitespace-pre-wrap">{result.layoutAndStructure}</p>
      </AnalysisSection>
      
      <AnalysisSection title="Key UI Components">
        <KeyComponents components={result.keyComponents} />
      </AnalysisSection>

      <AnalysisSection title="Visual Assets (Icons & Imagery)">
        <p className="text-slate-300 whitespace-pre-wrap">{result.visualAssets}</p>
      </AnalysisSection>
      
      <AnalysisSection title="Overall User Experience (UX)">
        <p className="text-slate-300 whitespace-pre-wrap">{result.overallUX}</p>
      </AnalysisSection>
    </div>
  );
};
