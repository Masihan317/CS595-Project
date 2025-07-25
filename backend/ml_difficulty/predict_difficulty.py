from flask_cors import CORS
from flask import Flask, request, jsonify
import joblib

# Load trained components
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")
label_encoder = joblib.load("label_encoder.pkl")

app = Flask(__name__)
CORS(app)

@app.route('/predict_difficulty', methods=['POST'])
def predict_difficulty():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "No text provided"}), 400

    X = vectorizer.transform([text])
    y_pred = model.predict(X)
    label = label_encoder.inverse_transform(y_pred)[0]

    return jsonify({"difficulty": label})
@app.route("/", methods=["GET"])
def home():
    return "✅ ML Difficulty API is running!"
if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 10000))  # 10000 or whatever Render assigns
    app.run(host='0.0.0.0', port=port)
