import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.naive_bayes import MultinomialNB

# Sample training data
texts = [
    "The cat sits on the mat.",
    "I like apples and bananas.",
    "She is reading a book.",
    "The experiment required detailed calibration and measurement techniques.",
    "Quantum computing involves superposition and entanglement.",
    "Understanding machine learning requires knowledge of algorithms and statistics.",
    "He went to school.",
    "She is drinking water.",
    "The sun rises in the east.",
    "Advanced theories in physics demand abstract mathematical modeling."
]

labels = [
    "Beginner",
    "Beginner",
    "Beginner",
    "Hard",
    "Hard",
    "Hard",
    "Beginner",
    "Beginner",
    "Beginner",
    "Hard"
]

# Encode labels
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(labels)

# Vectorize texts
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

# Train model
model = MultinomialNB()
model.fit(X, y)

# Save everything
joblib.dump(model, "model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")

print("✅ Model training complete. Files saved.")