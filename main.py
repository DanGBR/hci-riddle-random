import random
import json
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__)

def load_riddles(filepath="riddles.json"):
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)

riddle_bank = load_riddles()

@app.route("/riddle", methods=["GET"])
def get_random_riddle():
    rtype = random.choice(list(riddle_bank.keys()))
    difficulty = random.choice(list(riddle_bank[rtype].keys()))
    riddle = random.choice(riddle_bank[rtype][difficulty])
    return jsonify({
        "type": rtype,
        "difficulty": difficulty,
        "question": riddle["question"],
        "answer": riddle["answer"]
    })

@app.route("/feedback", methods=["POST"])
def dummy_feedback():
    return jsonify({"status": "ignored"})

@app.route("/")
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory('.', path)

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)