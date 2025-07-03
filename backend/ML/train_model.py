from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib
import numpy as np  


texts = [
    "This is a simple sentence to read.",              # Easy
    "He is walking to school.",                        # Easy
    "Python is widely used in data science.",          # Medium
    "Computer architecture is important.",             # Medium
    "Quantum computing is a challenging field.",       # Hard
    "Black hole physics is still under research."      # Hard
]

labels = ["Easy", "Easy", "Medium", "Medium", "Hard", "Hard"]


vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)


label_encoder = LabelEncoder()
y = label_encoder.fit_transform(labels)


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)


model = RandomForestClassifier()
model.fit(X_train, y_train)


y_pred = model.predict(X_test)


print(classification_report(
    y_test,
    y_pred,
    labels=np.unique(y_test),
    target_names=label_encoder.inverse_transform(np.unique(y_test))
))


joblib.dump(model, "model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")
