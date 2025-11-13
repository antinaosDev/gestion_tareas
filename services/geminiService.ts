
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getTaskAssistance = async (taskDescription: string): Promise<string> => {
  try {
    const prompt = `Proporciona una guía detallada, mejores prácticas y posibles desafíos para la siguiente tarea de un plan de implementación de un modelo de salud con pertinencia cultural. Estructura la respuesta de forma clara y útil para un equipo de gestión de salud. Tarea: "${taskDescription}"`;
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting task assistance:", error);
    return "No se pudo obtener la asistencia de la IA. Por favor, inténtelo de nuevo.";
  }
};

export const chatWithBot = async (history: ChatMessage[], newMessage: string): Promise<string> => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.text }]
            })),
            config: {
                systemInstruction: "Eres un asistente experto en modelos de salud con pertinencia cultural en Chile, basado en la Ley 20.584. Responde las preguntas de los usuarios de forma concisa y útil."
            }
        });
        const response: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
        return response.text;
    } catch (error) {
        console.error("Error in chatWithBot:", error);
        return "Hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.";
    }
};


export const analyzeImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
  try {
    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: base64Image,
      },
    };
    const textPart = { text: prompt };
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing image:", error);
    return "No se pudo analizar la imagen. Verifique el formato y vuelva a intentarlo.";
  }
};

export const searchWithAI = async (query: string): Promise<{text: string, sources: any[]}> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Basado en información actualizada, responde la siguiente pregunta relacionada con la salud intercultural en Chile: ${query}`,
      config: {
        tools: [{googleSearch: {}}],
      },
    });
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    return { text: response.text, sources };
  } catch (error) {
    console.error("Error with AI search:", error);
    return { text: "No se pudo realizar la búsqueda con IA. Por favor, inténtelo de nuevo.", sources: [] };
  }
};
