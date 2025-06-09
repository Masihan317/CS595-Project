console.log(process.env.GEMINI_API_KEY)

import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { summarizeWithGemini, generateFlashcards } from "./gemini.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const router = express.Router();

router.post("/summarize", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    console.log("here")
    const summary = await summarizeWithGemini(`Summarize this: ${text}`);
    console.log(summary)
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

router.post("/flashcards", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    const prompt = `Generate 5 educational flashcards in JSON format. Each flashcard should include a "question" and "answer" based on these notes:\n\n${text}`;
    const rawResponse = await generateFlashcards(prompt);

    // Optional: Try parsing to JSON
    let cleaned = rawResponse.trim();

    // Remove markdown formatting if present
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.replace(/```json\n?/, "").replace(/```$/, "").trim();
    }

    let flashcards;
    try {
      flashcards = JSON.parse(cleaned);
    } catch {
      flashcards = [{ question: "Parsing failed", answer: cleaned }];
    }


    res.json({ flashcards });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
