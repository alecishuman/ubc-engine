from flask import Flask, jsonify, request


class User:

    def signup(self):
        user = request.json
        user["_id_"] = 1
        return jsonify(user), 200
