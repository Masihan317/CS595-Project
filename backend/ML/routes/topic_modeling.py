# ✅ File: routes/topic_modeling.py (KeyBERT + De-duplication)

import nltk
import string
from flask import Blueprint, request, jsonify
from keybert import KeyBERT
from nltk.tokenize import TreebankWordTokenizer
from difflib import SequenceMatcher

# Download tokenizer once
nltk.download("punkt")

# Setup Blueprint
topic_bp = Blueprint("topic_model", __name__)

# Load tokenizer and model
tokenizer = TreebankWordTokenizer()
model = KeyBERT()

# Preprocessing function
def preprocess(text):
    tokens = tokenizer.tokenize(text.lower())
    tokens = [t for t in tokens if t not in string.punctuation]
    return " ".join(tokens)

# Helper to check similarity
def is_similar(a, b, threshold=0.75):
    return SequenceMatcher(None, a, b).ratio() > threshold

# Route to extract clean keywords
@topic_bp.route("/topic-model", methods=["POST"])
def topic_model():
    data = request.get_json()
    note = data.get("text")

    if not note or not isinstance(note, str):
        return jsonify({"error": "A single text note is required."}), 400

    cleaned = preprocess(note)

    # Extract top N keywords/phrases
    raw_keywords = model.extract_keywords(
        cleaned,
        keyphrase_ngram_range=(1, 2),
        stop_words="english",
        top_n=10
    )

    # De-duplicate similar phrases
    filtered_keywords = []
    for kw, _ in raw_keywords:
        if not any(is_similar(kw, existing) for existing in filtered_keywords):
            filtered_keywords.append(kw)

    return jsonify({"keywords": filtered_keywords})
