# ✅ File: routes/classify.py
from flask import Blueprint, request, jsonify
import joblib
import os
import nltk
import string

nltk.download('punkt')

# Blueprint setup
classify_bp = Blueprint("classify", __name__)

# Load model and vectorizer
model_path = os.path.join(os.path.dirname(__file__), "..", "models", "classifier.pkl")
model_path = os.path.abspath(model_path)  # Ensures full path
vectorizer_path = os.path.join(os.path.dirname(__file__), "..", "models", "vectorizer.pkl")
vectorizer_path = os.path.abspath(vectorizer_path)

classifier = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)

# Text preprocessing helper
def preprocess(text):
    tokens = nltk.word_tokenize(text.lower())
    tokens = [t for t in tokens if t not in string.punctuation]
    return " ".join(tokens)

# Route: Predict subject from text
@classify_bp.route("/predict-subject", methods=["POST"])
def predict_subject():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "Text field is required."}), 400

    processed = preprocess(data["text"])
    X = vectorizer.transform([processed])
    prediction = classifier.predict(X)[0]

    return jsonify({"subject": prediction})
