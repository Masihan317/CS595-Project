import nltk
import string
import joblib
from flask import Blueprint, request, jsonify
from nltk.tokenize import TreebankWordTokenizer
from keybert import KeyBERT
from difflib import SequenceMatcher

# Setup
nltk.download("punkt")
analyze_bp = Blueprint("analyze", __name__)
tokenizer = TreebankWordTokenizer()
keybert_model = KeyBERT()

# Load classifier
classifier = joblib.load("models/classifier.pkl")
vectorizer = joblib.load("models/vectorizer.pkl")

# Preprocessing (same for both)
def preprocess(text):
    tokens = tokenizer.tokenize(text.lower())
    tokens = [t for t in tokens if t not in string.punctuation]
    return " ".join(tokens)

def is_similar(a, b, threshold=0.75):
    return SequenceMatcher(None, a, b).ratio() > threshold

@analyze_bp.route("/analyze-note", methods=["POST"])
def analyze_note():
    data = request.get_json()
    note = data.get("text")

    if not note or not isinstance(note, str):
        return jsonify({"error": "A single text note is required."}), 400

    # --- Subject classification ---
    processed = preprocess(note)
    X = vectorizer.transform([processed])
    subject = classifier.predict(X)[0]

    # --- Keyword extraction ---
    raw_keywords = keybert_model.extract_keywords(
        processed,
        keyphrase_ngram_range=(1, 2),
        stop_words="english",
        top_n=10
    )

    keywords = []
    for kw, _ in raw_keywords:
        if not any(is_similar(kw, existing) for existing in keywords):
            keywords.append(kw)

    return jsonify({
        "subject": subject,
        "keywords": keywords
    })
