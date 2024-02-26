from flask import Flask, request, jsonify
import json
import requests
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

url = "http://localhost:11434/api/generate"

headers = {
    'Content-Type': 'application/json',
}

conversation_history = []


@app.route('/ask', methods=['POST'])
def ask():
    user_message = request.json['question']
    conversation_history.append(user_message)
    full_prompt = user_message.join(
        conversation_history)

    data = {
        "model": "llama2",
        "stream": False,
        "prompt": full_prompt,
        "max_tokens": 100,
        "stop_sequence": "Fin de la conversation",
        "temperature": 0.5,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "best_of": 1,
        "n": 1,
        "logit_bias": {"Fin de la conversation": -1000},
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        response_text = response.text
        data = json.loads(response_text)
        actual_response = data["response"]
        conversation_history.append(actual_response)
        return (actual_response)
    else:
        print("Erreur:", response.status_code, response.text)
        return None


if __name__ == "__main__":
    app.run(debug=True)
