from flask import Blueprint, request, jsonify
import joblib

predict_bp = Blueprint('predict_bp', __name__)

# Load trained components
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")
label_encoder = joblib.load("label_encoder.pkl")

@predict_bp.route('/predict_difficulty', methods=['POST'])
def predict_difficulty():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "No text provided"}), 400

    X = vectorizer.transform([text])
    y_pred = model.predict(X)
    label = label_encoder.inverse_transform(y_pred)[0]

    return jsonify({"difficulty": label})
