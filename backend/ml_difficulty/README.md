# ML Difficulty Module

This folder contains the Machine Learning-based difficulty estimation feature built using Python.

## Files
- `train_model.py`: Trains a classification model on labeled sentences (Easy/Medium/Hard), and saves:
  - `model.pkl` (trained RandomForest model)
  - `vectorizer.pkl` (TF-IDF vectorizer)
  - `label_encoder.pkl` (LabelEncoder for difficulty levels)

- `predict_difficulty.py`: Exposes the trained model via a **Flask API** endpoint at `/predict_difficulty`.

- `app.py`: Provides a **Streamlit UI** for users to input text and get predicted difficulty level.

- `test_predict.py`: Python script to test the Flask API with sample input.

- `README.md`: This file.

## How to Run Locally

> Make sure `flask`, `scikit-learn`, `textstat`, and `streamlit` are installed (`pip install -r requirements.txt` if available).

### 1. Train the model

```bash
python3 train_model.py

This will create *.pkl files used in later steps.

2. Start Flask API

python3 predict_difficulty.py

API runs at: http://127.0.0.1:5000/predict_difficulty

3. Launch UI (Streamlit)
streamlit run app.py

Opens UI at: http://localhost:8501

4. Test API (Optional)
python3 test_predict.py

