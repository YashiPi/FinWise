from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend interaction

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
# db = client["bankingApp"]
db = client["test"]
users_collection = db["users"]
goals_collection = db["goals"]
microinvestments_collection = db["microinvestments"]
transactions_collection = db["transactions"]
account_collection = db["account"]

# API to check balance
@app.route("/check_balance", methods=["GET"])
def check_balance():
    user_id = request.args.get("userId")  # Get userId from query params
    user = users_collection.find_one({"userId": user_id})

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({"balance": user["balance"]})


# API to create/update goals
@app.route("/api/goals", methods=["POST"])
def set_goals():
    data = request.json
    user_id = data.get("userId")
    expenditure_goal = data.get("expenditureGoal")
    savings_goal = data.get("savingsGoal")

    if not user_id or expenditure_goal is None or savings_goal is None:
        return jsonify({"error": "Missing userId, expenditureGoal, or savingsGoal"}), 400

    try:
        goal = goals_collection.find_one({"userId": user_id})

        if not goal:
            goal = {
                "userId": user_id,
                "expenditureGoal": expenditure_goal,
                "savingsGoal": savings_goal,
            }
            goals_collection.insert_one(goal)
        else:
            goals_collection.update_one(
                {"userId": user_id},
                {"$set": {"expenditureGoal": expenditure_goal, "savingsGoal": savings_goal}},
            )

        return jsonify(goal)

    except Exception as e:
        print(f"Error in POST /api/goals: {e}")
        return jsonify({"error": "Internal server error"}), 500
    

if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Runs on http://localhost:5000