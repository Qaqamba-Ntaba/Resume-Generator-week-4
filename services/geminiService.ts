
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData, UserInput } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A 2-4 sentence professional summary based on the provided keywords and experience.",
    },
    experience: {
      type: Type.ARRAY,
      description: "An array of work experiences.",
      items: {
        type: Type.OBJECT,
        properties: {
          jobTitle: { type: Type.STRING },
          company: { type: Type.STRING },
          dates: { type: Type.STRING },
          bulletPoints: {
            type: Type.ARRAY,
            description: "3-5 action-oriented bullet points describing responsibilities and achievements.",
            items: { type: Type.STRING },
          },
        },
        required: ["jobTitle", "company", "dates", "bulletPoints"],
      },
    },
  },
  required: ["summary", "experience"],
};

export const generateResumeContent = async (userInput: UserInput): Promise<Partial<ResumeData>> => {
  const { summaryKeywords, experience } = userInput;

  const experiencePrompt = experience.map(exp => `
    - Job Title: ${exp.jobTitle}
    - Company: ${exp.company}
    - Dates: ${exp.dates}
    - Key Duties/Achievements: ${exp.duties}
  `).join('');

  const prompt = `
    Act as a professional resume writer and career coach.
    Based on the following information, generate a professional summary and detailed, action-oriented bullet points for each work experience.
    The tone should be confident, professional, and results-focused. Use strong action verbs.
    
    **Summary Keywords:**
    ${summaryKeywords}
    
    **Work History:**
    ${experiencePrompt}

    Return the response in a structured JSON format.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    // We need to ensure the order of experience is maintained
    const generatedExperience = parsedData.experience.map((exp: any, index: number) => ({
        ...exp,
        id: userInput.experience[index].id,
    }));

    return {
        summary: parsedData.summary,
        experience: generatedExperience,
    };
  } catch (error) {
    console.error("Error generating resume content:", error);
    throw new Error("Failed to generate content from AI. Please check your input and try again.");
  }
};
