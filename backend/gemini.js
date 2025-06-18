import axios from "axios";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent";

export async function summarizeWithGemini(prompt) {
  try {
    const res = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return result || "No summary returned.";
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    throw new Error("Gemini API call failed");
  }
}

export async function generateFlashcards(prompt) {
  try {
    const res = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const output = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return output || "No flashcards returned.";
  } catch (err) {
    console.error("Gemini flashcard error:", err.response?.data || err.message);
    throw new Error("Gemini Flashcard API call failed");
  }
}

//Q&A chatbot Gemini helper function
export async function answerQuestionWithGemini(notes, question) {
  const prompt = `
You are an educational assistant. Use the following class notes to answer the question clearly and concisely.

Notes:
${notes}

Question: ${question}
Answer:
  `;

  try {
    const res = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No answer returned.";
  } catch (err) {
    console.error("Gemini Q&A error:", err.response?.data || err.message);
    throw new Error("Gemini Q&A API call failed");
  }
}

