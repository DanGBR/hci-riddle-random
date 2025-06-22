import random
import math
from collections import defaultdict
import json
from flask import Flask, jsonify, request, send_from_directory
import os

def load_riddles(filepath="riddles.json"):
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)

app = Flask(__name__)
riddle_bank = load_riddles()

@app.route("/riddle", methods=["GET"])
def get_riddle():
    riddle_types = list(riddle_bank.keys())
    rtype = random.choice(riddle_types)
    difficulty_levels = list(riddle_bank[rtype].keys())
    difficulty = random.choice(difficulty_levels)
    riddle = random.choice(riddle_bank[rtype][difficulty])
    return jsonify({
        "type": rtype,
        "difficulty": difficulty,
        "question": riddle["question"],
        "answer": riddle["answer"]
    })

@app.route("/feedback", methods=["POST"])
def submit_feedback():
    data = request.json
    print("Feedback received:", data)
    return jsonify({"status": "success"})


# Serve static index.html and other static files from current directory
@app.route("/")
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory('.', path)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)