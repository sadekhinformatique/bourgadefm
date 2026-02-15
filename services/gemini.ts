
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCulturalInsight = async (): Promise<any> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Donne-moi un fait court et intéressant sur la culture, la musique ou l'histoire du Burkina Faso pour un auditeur de radio.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING, description: 'Le titre du sujet' },
            content: { type: Type.STRING, description: 'Le contenu du fait culturel' }
          },
          required: ['topic', 'content']
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      topic: "Le Burkina Faso",
      content: "Le pays des Hommes Intègres est reconnu pour sa richesse culturelle et son hospitalité légendaire."
    };
  }
};
