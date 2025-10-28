
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    colorPalette: {
      type: Type.ARRAY,
      description: "List of main colors used on the site.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "e.g., Primary, Accent, Background" },
          hex: { type: Type.STRING, description: "Hex code, e.g., #FFFFFF" },
          usage: { type: Type.STRING, description: "Where this color is used." },
        },
        required: ["name", "hex", "usage"],
      },
    },
    typography: {
      type: Type.OBJECT,
      description: "Typography details.",
      properties: {
        primaryFont: { type: Type.STRING, description: "Primary font family name." },
        secondaryFont: { type: Type.STRING, description: "Secondary font family name, if any." },
        scale: {
          type: Type.ARRAY,
          description: "Typographic scale for different elements.",
          items: {
            type: Type.OBJECT,
            properties: {
              element: { type: Type.STRING, description: "e.g., H1, Body, Button" },
              fontSize: { type: Type.STRING, description: "e.g., 2.5rem, 16px" },
              fontWeight: { type: Type.STRING, description: "e.g., 700, normal" },
              fontFamily: { type: Type.STRING, description: "The font family used for this element." },
            },
            required: ["element", "fontSize", "fontWeight", "fontFamily"],
          },
        },
      },
      required: ["primaryFont", "scale"],
    },
    layoutAndStructure: {
      type: Type.STRING,
      description: "Analysis of the website's layout, grid system, and spacing principles.",
    },
    keyComponents: {
      type: Type.ARRAY,
      description: "Breakdown of key reusable UI components.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Component name, e.g., Navigation Bar" },
          description: { type: Type.STRING, description: "Detailed description of the component's UI and functionality." },
        },
        required: ["name", "description"],
      },
    },
    overallUX: {
      type: Type.STRING,
      description: "A summary of the overall user experience, interaction design, and user flow.",
    },
    visualAssets: {
        type: Type.STRING,
        description: "Description of icons, illustrations, and imagery style."
    }
  },
  required: ["colorPalette", "typography", "layoutAndStructure", "keyComponents", "overallUX", "visualAssets"],
};

export const analyzeWebsiteUI = async (url: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: `Analyze the UI/UX of the website at this URL: ${url}. Provide a comprehensive design document based on my requested JSON schema. Be very detailed in your descriptions.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("Received an empty response from the API.");
    }

    const result: AnalysisResult = JSON.parse(jsonText);
    return result;
  } catch (error) {
    console.error("Error analyzing website UI:", error);
    throw new Error("Failed to analyze the website. The API may be unavailable or the URL may be inaccessible.");
  }
};
