// services/geminiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { PortfolioData } from "../types";

// Make sure you have GEMINI_API_KEY set in your env:
//   setx GEMINI_API_KEY "your_api_key"
// or via .env if you're using something like vite-plugin-env-compatible
const client = new GoogleGenerativeAI(
  process.env.VITE_GEMINI_API_KEY || ""
);

export const generatePortfolioContent = async (
  linkedInUrl: string
): Promise<PortfolioData> => {
  if (!process.env.VITE_GEMINI_API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY environment variable is not set");
  }

  const prompt = `
    Generate a professional, impressive portfolio JSON object for a Software Engineer based on this LinkedIn URL or context: "${linkedInUrl}".

    If the URL is strictly a link without content access, INFER the profile of a "Senior Full Stack Engineer" named Ajit Sharma
    (implied from ajitcse20 meaning Computer Science 2020 grad).
    Create plausible, high-quality projects and experience if strict data is unavailable.

    The tone should be innovative, technical, and leadership-oriented.
  `;

  const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

  const response = await model.generateContent({
    contents: [{
      role: "user",
      parts: [{ text: prompt }]
    }],
  });

  const text = response.response?.text?.();
  if (!text) {
    throw new Error("Failed to generate content: empty response from Gemini");
  }

  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch (err) {
    console.error("Raw Gemini response was not valid JSON:", text);
    throw new Error("Failed to parse Gemini response as JSON");
  }

  return json as PortfolioData;
};
