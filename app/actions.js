"use server";

import { GoogleGenAI } from "@google/genai";

export async function askAI(prevState, formData) {
  const question = formData.get("question");

  if (typeof question !== "string" || !question.trim()) {
    return { answer: "", error: "Question likho bro!" };
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: question,
    });

    return {
      answer: response.text || "No answer generated",
      error: "",
    };
  } catch (error) {
    console.error("Gemini error:", error);
    return {
      answer: "",
      error: "AI se answer nahi mil paya.",
    };
  }
}
