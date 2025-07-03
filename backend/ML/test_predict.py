import requests

url = 'http://127.0.0.1:5000/predict_difficulty'
data = {'text': 'Quantum computing is a challenging field in computer science.'}

response = requests.post(url, json=data)
print(response.json())
