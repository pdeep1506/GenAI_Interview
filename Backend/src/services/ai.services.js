import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({

    apiKey: process.env.Google_GenAI_API_KEY
});


export async function invokeGeminiAi() {
    const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: 'Explain what is Interview',
        
    })

    console.log(response.text);
}


