from flask import Flask
from flask_cors import CORS
from routes.classify import classify_bp
from routes.topic_modeling import topic_bp
from routes.analyze import analyze_bp
from routes.predict_difficulty import predict_bp  # ⬅️ این خط جدید

import os

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(classify_bp)
app.register_blueprint(topic_bp)
app.register_blueprint(analyze_bp)
app.register_blueprint(predict_bp)  # ⬅️ این خط جدید

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
