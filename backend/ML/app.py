import streamlit as st
import requests

st.title("Text Difficulty Estimator")

user_input = st.text_area("Enter your sentence:")

if st.button("Estimate Difficulty"):
    if user_input.strip():
        response = requests.post("http://127.0.0.1:5000/predict_difficulty", json={"text": user_input})
        result = response.json()
        st.success(f"Predicted Difficulty: **{result['difficulty']}**")
    else:
        st.warning("Please enter a sentence.")
