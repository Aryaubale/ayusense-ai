from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import joblib
import pandas as pd
import os
import traceback
from dotenv import load_dotenv

# Load environment variables from a .env file (locally)
load_dotenv()

app = Flask(__name__)
CORS(app)

# ================================
# 🛰️ 1. DATABASE CONNECTION
# ================================
# We pull the URI from an environment variable instead of hardcoding it
MONGO_URI = os.getenv("MONGO_URI")

try:
    if not MONGO_URI:
        raise ValueError("MONGO_URI not found in environment variables")
        
    client = MongoClient(
        MONGO_URI,
        tls=True,
        tlsAllowInvalidCertificates=True,
        serverSelectionTimeoutMS=30000
    )
    db = client.ayusense_db
    users_collection = db.users
    client.admin.command('ping')
    print("✅ MongoDB Connected Successfully!")
except Exception as e:
    print("❌ MongoDB Connection Error:", e)
    traceback.print_exc()
    users_collection = None

# ================================
# 🧠 2. MODEL LOADING
# ================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_FILE = os.path.join(BASE_DIR, 'prakriti_model.pkl')
COLUMNS_FILE = os.path.join(BASE_DIR, 'model_columns.pkl')
ENCODER_FILE = os.path.join(BASE_DIR, 'dosha_encoder.pkl')

try:
    model = joblib.load(MODEL_FILE)
    model_columns = joblib.load(COLUMNS_FILE)
    encoder = joblib.load(ENCODER_FILE)
    COLUMN_MAP = {col.lower().strip(): col for col in model_columns}
    print("✅ AI Model Loaded Successfully!")
except Exception as e:
    print("❌ Model Loading Error:", e)
    traceback.print_exc()

# ================================
# 🛠️ 3. HELPER FUNCTION
# ================================
def find_matching_column(question, answer):
    key = f"{question}_{answer}".strip().lower()
    matched_col = COLUMN_MAP.get(key)
    if matched_col:
        return matched_col
    return None

# ================================
# 🔐 4. AUTH ROUTES
# ================================
@app.route('/api/signup', methods=['POST'])
def signup():
    if users_collection is None:
        return jsonify({"success": False, "error": "Database not connected"}), 500
    try:
        data = request.json
        email = data.get('email')
        if users_collection.find_one({"email": email}):
            return jsonify({"success": False, "error": "Email already exists"}), 400
        new_user = {
            "name": data.get('name'),
            "email": email,
            "password": data.get('password'),
            "age": data.get('age'),
            "gender": data.get('gender'),
            "occupation": data.get('occupation'),
            "location": data.get('location'),
            "prakriti": "Not Analyzed",
            "stats": {},
            "chats": [],
            "reminders": {
                "brahmaMuhurta": True,
                "dinacharya": True,
                "herbReminder": True
            }
        }
        users_collection.insert_one(new_user)
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    if users_collection is None:
        return jsonify({"success": False, "error": "Database not connected"}), 500
    try:
        data = request.json
        user = users_collection.find_one({
            "email": data.get('email'),
            "password": data.get('password')
        })
        if user:
            user['_id'] = str(user['_id'])
            if "reminders" not in user:
                user["reminders"] = {"brahmaMuhurta": True, "dinacharya": True, "herbReminder": True}
            return jsonify({"success": True, "user": user})
        return jsonify({"success": False, "error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# ================================
# 🎯 5. PREDICTION & SAVE RESULTS
# ================================
@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        user_answers = data.get('answers')
        input_data = {col: 0 for col in model_columns}
        for question, answer in user_answers.items():
            matched_col = find_matching_column(question, answer)
            if matched_col:
                input_data[matched_col] = 1
        final_input = pd.DataFrame([input_data]).reindex(columns=model_columns, fill_value=0)
        prediction_idx = model.predict(final_input)[0]
        probabilities = model.predict_proba(final_input)[0]
        dominant_dosha = str(encoder.inverse_transform([prediction_idx])[0])
        prob_map = {label.lower(): round(float(prob) * 100, 1) for label, prob in zip(encoder.classes_, probabilities)}
        return jsonify({"success": True, "dominant_dosha": dominant_dosha, "stats": prob_map})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/save_results', methods=['POST'])
def save_results():
    try:
        data = request.json
        users_collection.update_one(
            {"email": data.get('email')},
            {"$set": {"prakriti": data.get('dominant_dosha'), "stats": data.get('stats')}}
        )
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# ========================================================
# 🔔 6. REMINDER SYSTEM & CHAT
# ========================================================
@app.route('/api/update_reminders', methods=['POST'])
def update_reminders():
    if users_collection is None:
        return jsonify({"success": False, "error": "Database not connected"}), 500
    try:
        data = request.json
        email = data.get('email')
        new_reminders = data.get('reminders')
        users_collection.update_one(
            {"email": email},
            {"$set": {"reminders": new_reminders}}
        )
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/chat_history', methods=['GET'])
def get_chat_history():
    try:
        email = request.args.get('email')
        user = users_collection.find_one({"email": email}, {"chats": 1, "_id": 0})
        return jsonify({"success": True, "history": user.get("chats", []) if user else []})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/save_chat', methods=['POST'])
def save_chat():
    try:
        data = request.json
        chat_entry = {
            "id": str(os.urandom(4).hex()), 
            "message": data.get('message'),
            "response": data.get('response'),
            "created_at": pd.Timestamp.now().isoformat()
        }
        users_collection.update_one({"email": data.get('email')}, {"$push": {"chats": chat_entry}})
        return jsonify({"success": True, "chat": chat_entry})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
