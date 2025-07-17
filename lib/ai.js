import { getGeminiApiKey } from "@/lib/server-utils";

export async function generateContentFromPrompt(prompt) {
  try {
    const apiKey = await getGeminiApiKey();
    if (!apiKey) {
      throw new Error("Gemini API key not found.");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const body = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.text();

      if (response.status === 429) {
        throw new Error(
          `API OUT OF QUOTA - WAIT TO GENERATE CONTENT`
        );
      }
      throw new Error(
        `API request failed with status ${response.status}: ${errorBody}`
      );
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating content:", error);
    return error.message;
  }
}
