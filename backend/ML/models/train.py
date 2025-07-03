# ✅ File: train_model.py
# This script trains a simple text classification model
# for predicting subject categories and saves it for use in the Flask API.

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import joblib
import os

# Ensure models directory exists
os.makedirs("models", exist_ok=True)

# Sample dataset for training
# sample_data = {
#     "text": [
#         "The Pythagorean theorem is a fundamental concept in geometry.",
#         "The American Civil War started in 1861.",
#         "Photosynthesis is the process by which plants make energy.",
#         "Shakespeare wrote Romeo and Juliet.",
#         "Newton's laws explain how motion works."
#     ],
#     "label": ["Math", "History", "Science", "Literature", "Physics"]
# }

# Load updated training data from CSV
df = pd.read_csv("data/training_data.csv")

# Create a pipeline for preprocessing and classification
pipeline = Pipeline([
    ("vectorizer", TfidfVectorizer(stop_words="english")),
    ("classifier", MultinomialNB())
])

# Train the model
pipeline.fit(df["text"], df["label"])

# Save classifier and vectorizer separately
joblib.dump(pipeline.named_steps["classifier"], "models/classifier.pkl")
joblib.dump(pipeline.named_steps["vectorizer"], "models/vectorizer.pkl")

print("✅ Text classification model and vectorizer saved to 'models/' folder.")
