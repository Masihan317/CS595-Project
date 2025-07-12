from flask import Flask, request, jsonify
import joblib
import os

# Load trained components
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")
label_encoder = joblib.load("label_encoder.pkl")

app = Flask(__name__)

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

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Use environment variable PORT
    app.run(host="0.0.0.0", port=port)
