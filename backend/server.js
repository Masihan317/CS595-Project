import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { summarizeWithGemini } from "./gemini.js";

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