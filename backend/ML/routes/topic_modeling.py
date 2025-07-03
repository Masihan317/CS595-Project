# ✅ File: routes/topic_model.py
import nltk
import string
from flask import Blueprint, request, jsonify
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import TfidfVectorizer

nltk.download("punkt")

# Blueprint setup
topic_bp = Blueprint("topic_model", __name__)

# Preprocessing function
def preprocess(text):
    tokens = nltk.word_tokenize(text.lower())
    tokens = [t for t in tokens if t not in string.punctuation]
    return " ".join(tokens)

# Route to extract topics
@topic_bp.route("/topic-model", methods=["POST"])
def topic_model():
    data = request.get_json()
    texts = data.get("texts")

    if not texts or not isinstance(texts, list):
        return jsonify({"error": "A list of texts is required."}), 400

    # Clean the text data
    cleaned = [preprocess(t) for t in texts]

    # TF-IDF Vectorization
    vectorizer = TfidfVectorizer(stop_words="english")
    X = vectorizer.fit_transform(cleaned)

    # LDA Model
    lda = LatentDirichletAllocation(n_components=5, random_state=42)
    lda.fit(X)

    feature_names = vectorizer.get_feature_names_out()
    topics = []

    for idx, topic in enumerate(lda.components_):
        keywords = [feature_names[i] for i in topic.argsort()[-5:][::-1]]
        topics.append({
            "topic_num": idx + 1,
            "keywords": keywords
        })

    return jsonify({"topics": topics})
