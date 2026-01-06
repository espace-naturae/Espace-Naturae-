
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

// Always initialize with the named parameter and use process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBotanicalAdvice = async (history: Message[], prompt: string) => {
  try {
    // Query GenAI with both the model name and prompt/contents in a single call
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.8,
      },
    });

    // The text property directly returns the string output. Do not use text()
    return response.text || "Désolé, je rencontre une petite difficulté technique. Puis-je vous aider autrement ?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Je m'excuse, une erreur est survenue lors de l'analyse de votre demande. Nos soins restent cependant à votre disposition.";
  }
};
