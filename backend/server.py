from flask import Flask, request, jsonify;
from flask_cors import CORS;

# Create a Flask app
app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['GET'])
def return_response():
    return jsonify({'data': 'Hello World!'})

if __name__ == "__main__":
    app.run(debug=True, port=8080)