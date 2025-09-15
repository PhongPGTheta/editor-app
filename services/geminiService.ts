import { GoogleGenAI, Modality } from "@google/genai";
import type { EditedResult } from '../types';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

export const translateToEnglish = async (text: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: text,
      config: {
        systemInstruction: "You are an expert translator. Your task is to translate Vietnamese text to English for an AI image generation model. Respond only with the translated English text, ensuring it's a clear and direct instruction for the image model. If the input text is already in English, return it unchanged.",
        thinkingConfig: { thinkingBudget: 0 } // For faster translation
      },
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error (Translation):", error);
    throw new Error("Failed to translate prompt.");
  }
};

export const editImageWithGemini = async (prompt: string, imageFile: File): Promise<EditedResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const base64ImageData = await fileToBase64(imageFile);
  const mimeType = imageFile.type;

  const imagePart = {
    inlineData: {
      data: base64ImageData,
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: prompt,
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    const result: EditedResult = { image: null, text: null };

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          result.text = part.text;
        } else if (part.inlineData) {
          result.image = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    if (!result.image) {
      throw new Error("API did not return an image. The prompt may have been blocked or the model couldn't fulfill the request.");
    }

    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to communicate with the Gemini API. Check the console for more details.");
  }
};