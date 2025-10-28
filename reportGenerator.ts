
import type { AnalysisResult } from './types';

export const generateMarkdownReport = (result: AnalysisResult, url: string): string => {
  const domain = new URL(url).hostname;
  let markdown = `# UI/UX Analysis Report for ${domain}\n\n`;
  markdown += `**Source URL:** [${url}](${url})\n\n`;
  markdown += `*This report was generated on ${new Date().toUTCString()}*\n\n`;
  markdown += `---\n\n`;

  // Color Palette
  markdown += `## 1. Color Palette\n\n`;
  markdown += `| Preview | Name | Hex Code | Usage |\n`;
  markdown += `|:---:|---|---|---|\n`;
  result.colorPalette.forEach(color => {
    const cleanHex = color.hex.startsWith('#') ? color.hex.substring(1) : color.hex;
    markdown += `| <img src="https://via.placeholder.com/24/${cleanHex}/${cleanHex}.png" width="24" height="24" alt="${color.name}" style="border-radius: 4px;"> | ${color.name} | \`${color.hex}\` | ${color.usage.replace(/\n/g, ' ')} |\n`;
  });
  markdown += `\n`;

  // Typography
  markdown += `## 2. Typography\n\n`;
  markdown += `### Fonts\n\n`;
  markdown += `- **Primary Font:** ${result.typography.primaryFont}\n`;
  if (result.typography.secondaryFont) {
    markdown += `- **Secondary Font:** ${result.typography.secondaryFont}\n`;
  }
  markdown += `\n`;

  markdown += `### Typographic Scale\n\n`;
  markdown += `| Element | Font Family | Font Size | Font Weight |\n`;
  markdown += `|---|---|---|---|\n`;
  result.typography.scale.forEach(item => {
    markdown += `| ${item.element} | ${item.fontFamily} | ${item.fontSize} | ${item.fontWeight} |\n`;
  });
  markdown += `\n`;

  // Layout & Structure
  markdown += `## 3. Layout & Structure\n\n`;
  markdown += `${result.layoutAndStructure}\n\n`;

  // Key UI Components
  markdown += `## 4. Key UI Components\n\n`;
  result.keyComponents.forEach(component => {
    markdown += `### ${component.name}\n\n`;
    markdown += `${component.description}\n\n`;
  });

  // Visual Assets
  markdown += `## 5. Visual Assets (Icons & Imagery)\n\n`;
  markdown += `${result.visualAssets}\n\n`;

  // Overall UX
  markdown += `## 6. Overall User Experience (UX)\n\n`;
  markdown += `${result.overallUX}\n\n`;

  return markdown;
};

export const downloadReport = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
