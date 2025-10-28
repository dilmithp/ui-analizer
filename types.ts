
export interface ColorInfo {
  name: string;
  hex: string;
  usage: string;
}

export interface TypographyScaleItem {
  element: string;
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
}

export interface TypographyInfo {
  primaryFont: string;
  secondaryFont?: string;
  scale: TypographyScaleItem[];
}

export interface KeyComponent {
  name: string;
  description: string;
}

export interface AnalysisResult {
  colorPalette: ColorInfo[];
  typography: TypographyInfo;
  layoutAndStructure: string;
  keyComponents: KeyComponent[];
  overallUX: string;
  visualAssets: string;
}
