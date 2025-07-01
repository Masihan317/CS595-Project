import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { summarizeWithGemini, generateFlashcards, answerQuestionWithGemini  } from "./gemini.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const router = express.Router();

// 🔹 In-memory note storage
let savedNotes = "";

// Sihan's endpoint - summarize notes with AI
router.post("/summarize", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    const summary = await summarizeWithGemini(`Summarize this: ${text}`);
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔸 (Optional) Separate route to save notes manually
router.post("/save-notes", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required." });

  savedNotes = text;
  res.json({ message: "Notes saved successfully." });
});

// flashcard endpoint 
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

// Initial chatbot setup
router.post("/chat", async (req, res) => {
  const { question } = req.body;

  if (!savedNotes || !question) {
    return res.status(400).json({ error: "Missing question or notes not saved." });
  }

  try {
    const answer = await answerQuestionWithGemini(savedNotes, question);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/api", router);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});