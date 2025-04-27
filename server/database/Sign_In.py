from flask import Flask, request, jsonify
from pymongo import MongoClient
from werkzeug.security import check_password_hash
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# MongoDB setup
client = MongoClient("mongodb://localhost:27017")
db = client["your_database"]
users_collection = db["users"]

def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password required"}), 400

    # Find user by email
    user = users_collection.find_one({"email": email})
    if user and check_password_hash(user["password"], password):
        return jsonify({"success": True, "message": "Login successful", "email": email}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

if __name__ == "__main__":
    app.run(debug=True)
