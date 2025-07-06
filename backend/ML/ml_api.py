# ✅ File: ml_api.py
from flask import Flask
from routes.classify import classify_bp
from routes.topic_modeling import topic_bp
from routes.analyze import analyze_bp


app = Flask(__name__)

# Register the classification route
app.register_blueprint(classify_bp)
app.register_blueprint(topic_bp)
app.register_blueprint(analyze_bp)

if __name__ == "__main__":
    app.run(debug=True)
