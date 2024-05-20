from flask import Flask, request, jsonify;

# Create a Flask app
app = Flask(__name__)

@app.route('/api', methods=['GET'])
def return_response():
    return jsonify({'data': 'Hello World!'})

if __name__ == "__main__":
    app.run(debug=True)