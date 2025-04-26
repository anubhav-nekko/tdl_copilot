# main.py
import json
from flask import Flask, request, jsonify
from bedrock_module import call_claude_api
from retrieval_module import retrieve_topk

app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def chat():
    """
    Expects JSON:
      { "user_message": "...", "system_message": "..." (optional) }
    Calls Claude, returns a JSON with { "assistant_message": "..." }
    """
    data = request.json
    user_message = data.get("user_message", "")
    system_message = data.get("system_message", "")
    assistant_response = call_claude_api(system_message, user_message)
    return jsonify({"assistant_message": assistant_response})

@app.route("/retrieve", methods=["POST"])
def retrieve():
    """
    Expects JSON: { "query": "..." }
    Returns an array of results
    """
    data = request.json
    query = data.get("query", "")
    results = retrieve_topk(query)
    return jsonify(results)

if __name__ == "__main__":
    # For local dev, we typically run on localhost:5000
    # On EC2, you might run on 0.0.0.0 and a specific port
    app.run(host="0.0.0.0", port=5000, debug=True)
