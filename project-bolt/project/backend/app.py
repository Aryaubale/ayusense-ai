from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import joblib
import pandas as pd
import os
import traceback
from dotenv import load_dotenv

import smtplib
from email.mime.text import MIMEText
import bcrypt
import random
import time

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# ================================
# CONFIG
# ================================
app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')

# ================================
# OTP STORAGE (TEMP MEMORY)
# ================================
otp_store = {}

# ================================
# DATABASE CONNECTION
# ================================
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
# MODEL LOADING
# ================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

try:
    model = joblib.load(os.path.join(BASE_DIR, 'prakriti_model.pkl'))
    model_columns = joblib.load(os.path.join(BASE_DIR, 'model_columns.pkl'))
    encoder = joblib.load(os.path.join(BASE_DIR, 'dosha_encoder.pkl'))
    COLUMN_MAP = {col.lower().strip(): col for col in model_columns}
    print("✅ AI Model Loaded Successfully!")
except Exception as e:
    print("❌ Model Loading Error:", e)
    traceback.print_exc()

# ================================
def find_matching_column(question, answer):
    key = f"{question}_{answer}".strip().lower()
    return COLUMN_MAP.get(key)

# ================================
def send_email(to_email, subject, message):
    try:
        sender_email = os.getenv("EMAIL_USER")
        app_password = os.getenv("EMAIL_PASS")

        msg = MIMEText(message)
        msg["Subject"] = subject
        msg["From"] = sender_email
        msg["To"] = to_email

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, app_password)
            server.send_message(msg)

        print("✅ EMAIL SENT")
        return True

    except Exception as e:
        print("❌ EMAIL ERROR:", e)
        return False

# ================================
# AUTH ROUTES
# ================================
@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        email = data.get('email')

        if users_collection.find_one({"email": email}):
            return jsonify({"success": False, "error": "Email already exists"}), 400

        hashed_pw = bcrypt.hashpw(data.get('password').encode(), bcrypt.gensalt())

        users_collection.insert_one({
            "name": data.get('name'),
            "email": email,
            "password": hashed_pw,
            "age": data.get('age'),
            "gender": data.get('gender'),
            "occupation": data.get('occupation'),
            "location": data.get('location'),
            "prakriti": "Not Analyzed",
            "stats": {},
            "chats": [],
            "reminders": {"brahmaMuhurta": True, "dinacharya": True, "herbReminder": True}
        })

        return jsonify({"success": True})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        user = users_collection.find_one({"email": data.get('email')})

        if user and bcrypt.checkpw(data.get('password').encode(), user['password']):
            user['_id'] = str(user['_id'])

            if "reminders" not in user:
                user["reminders"] = {
                    "brahmaMuhurta": True,
                    "dinacharya": True,
                    "herbReminder": True
                }

            user.pop('password', None)

            return jsonify({"success": True, "user": user})

        return jsonify({"success": False, "error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# ================================
# CHAT HISTORY
# ================================
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

        users_collection.update_one(
            {"email": data.get('email')},
            {"$push": {"chats": chat_entry}}
        )

        return jsonify({"success": True, "chat": chat_entry})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route('/api/delete_message', methods=['DELETE'])
def delete_message():
    try:
        data = request.json
        email = data.get("email")
        msg_id = data.get("id")

        if not email or not msg_id:
            return jsonify({"success": False, "error": "Missing data"}), 400

        users_collection.update_one(
            {"email": email},
            {"$pull": {"chats": {"id": msg_id}}}
        )

        return jsonify({"success": True})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# ================================
# PASSWORD RESET
# ================================
@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    try:
        email = request.json.get("email")
        user = users_collection.find_one({"email": email})

        if not user:
            return jsonify({"success": False, "error": "User not found"}), 404

        otp = str(random.randint(100000, 999999))
        otp_store[email] = {"otp": otp, "expires": time.time() + 300}

        send_email(email, "Ayusense OTP Verification", f"Your OTP is: {otp}")

        return jsonify({"success": True, "message": "OTP sent"})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    try:
        email = request.json.get("email")
        otp = request.json.get("otp")

        if email not in otp_store:
            return jsonify({"success": False, "error": "OTP expired"}), 400

        data = otp_store[email]

        if time.time() > data["expires"] or data["otp"] != otp:
            return jsonify({"success": False, "error": "Invalid/Expired OTP"}), 400

        return jsonify({"success": True})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    try:
        email = request.json.get("email")
        new_password = request.json.get("password")

        hashed_pw = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt())

        users_collection.update_one(
            {"email": email},
            {"$set": {"password": hashed_pw}}
        )

        return jsonify({"success": True})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route('/api/update_reminders', methods=['POST'])
def update_reminders():
    try:
        data = request.json

        users_collection.update_one(
            {"email": data.get("email")},
            {"$set": {"reminders": data.get("reminders")}}
        )

        return jsonify({"success": True})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# ================================
# RUN SERVER
# ================================
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)