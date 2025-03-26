from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend interaction

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["bankingApp"]
users_collection = db["users"]

# API to check balance
@app.route("/check_balance", methods=["GET"])
def check_balance():
    user_id = request.args.get("userId")  # Get userId from query params
    user = users_collection.find_one({"userId": user_id})

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({"balance": user["balance"]})

# API to transfer money
@app.route("/transfer_money", methods=["POST"])
def transfer_money():
    data = request.json
    sender_id = data.get("fromUserId")
    receiver_id = data.get("toUserId")
    amount = data.get("amount")

    sender = users_collection.find_one({"userId": sender_id})
    receiver = users_collection.find_one({"userId": receiver_id})

    if not sender or not receiver:
        return jsonify({"message": "User not found"}), 404
    if sender["balance"] < amount:
        return jsonify({"message": "Insufficient balance"}), 400

    # Update balances
    users_collection.update_one({"userId": sender_id}, {"$inc": {"balance": -amount}})
    users_collection.update_one({"userId": receiver_id}, {"$inc": {"balance": amount}})

    return jsonify({"message": "Transfer successful"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Runs on http://localhost:5000