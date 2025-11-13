
import { GoogleGenAI, Type } from "@google/genai";
import { Tone } from '../types';

// Per coding guidelines, API_KEY is assumed to be present in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const changeTone = async (text: string, tone: Tone): Promise<string> => {
  // Per coding guidelines, API_KEY check is removed as it's assumed to be available.
  try {
    const systemInstruction = `You are a creative writing assistant. Rewrite the following confession to match the tone of '${tone}' while preserving its original meaning and anonymous feel. Do not add any new information. Output only the rewritten text.`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      // Fix: The 'contents' field for single-turn text prompts should be a string.
      contents: text,
      config: {
        systemInstruction,
        temperature: 0.8,
        topP: 0.9,
      },
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error changing tone:", error);
    return `Error applying tone: ${tone}. Please try again.`;
  }
};

export interface ModerationResult {
    grade: 'A1' | 'B2' | 'C4' | 'X';
    reason: string;
}

export const moderateContent = async (text: string): Promise<ModerationResult> => {
  // Per coding guidelines, API_KEY check is removed as it's assumed to be available.
  try {
    const systemInstruction = `You are a content moderation AI for an anonymous confessions platform. Analyze the following text for risk on a scale of A1 (Benign) to C4 (High-Risk) or X (Reject). Categories to check for: Hate Speech, Self-Harm, Personally Identifiable Information (PII), Harassment, Threats. Provide your response in the specified JSON format.
    - A1: Benign, safe for public display.
    - B2: Requires human confirmation. Could be sensitive or borderline.
    - C4: High-risk. Flag for immediate admin review.
    - X: Reject. Clearly violates policy, should not be posted.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        // Fix: The 'contents' field for single-turn text prompts should be a string.
        contents: text,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              grade: {
                type: Type.STRING,
                description: "The moderation grade (A1, B2, C4, X)."
              },
              reason: {
                type: Type.STRING,
                description: "A brief reason for the assigned grade."
              }
            },
            required: ['grade', 'reason'],
          },
        },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Validate the grade
    const validGrades = ['A1', 'B2', 'C4', 'X'];
    if (validGrades.includes(result.grade)) {
      return result as ModerationResult;
    } else {
      // Fallback if the model returns an invalid grade
      return { grade: 'B2', reason: 'AI returned an invalid grade, requires manual review.' };
    }

  } catch (error) {
    console.error("Error moderating content:", error);
    return { grade: 'B2', reason: 'AI moderation failed. Requires manual review.' };
  }
};
