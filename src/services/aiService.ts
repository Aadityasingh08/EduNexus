import { GoogleGenAI } from '@google/genai';
import { AIMessage } from '../types';

export interface AIResponsePayload {
  content: string;
  concept?: string;
  breakdown?: {
    concept: string;
    example: string;
    commonMistake: string;
    quickCheck: string;
  };
  codeSnippet?: {
    language: string;
    code: string;
  };
}

// Ensure you have VITE_GEMINI_API_KEY in your .env file
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateAIResponse = async (
  prompt: string,
  currentTopic: string = 'Normalization',
  courseName: string = 'Database Management Systems'
): Promise<AIResponsePayload> => {
  if (!API_KEY) {
    // Fallback if no API key is provided
    return {
      content: `I am currently in Offline Mode because the VITE_GEMINI_API_KEY is not configured. However, I can still tell you about ${currentTopic} in ${courseName}. Please add the API key to activate my full intelligence!`,
      concept: 'Offline Mode'
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const systemPrompt = `You are EduNexus, an advanced AI tutor teaching ${courseName}, focusing on ${currentTopic}. 
The user is asking a question. You must respond in valid JSON format ONLY, without any markdown formatting like \`\`\`json or \`\`\`.
Your JSON must follow this exact structure:
{
  "content": "A detailed, markdown-formatted response explaining the concept to the user.",
  "concept": "A short 2-4 word summary of what was discussed",
  "breakdown": {
    "concept": "A concise breakdown name",
    "example": "A real world example",
    "commonMistake": "A common mistake students make regarding this",
    "quickCheck": "A quick question to check their understanding"
  },
  "codeSnippet": {
    "language": "language name (e.g. python, sql)",
    "code": "The code itself"
  }
}
If the user's prompt doesn't require a breakdown or codeSnippet, you can omit those fields in the JSON. But always provide "content". Ensure the response is strictly parseable JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nUser Question: ${prompt}` }]
        }
      ]
    });

    const responseText = response.text;
    if (!responseText) throw new Error("Empty response from AI");

    // Clean potential markdown wrap
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsed: AIResponsePayload = JSON.parse(cleanedText);
    return parsed;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return {
      content: "I encountered an error while thinking about that. Please try asking again in a different way or check your API key configuration.",
      concept: "Error"
    };
  }
};
