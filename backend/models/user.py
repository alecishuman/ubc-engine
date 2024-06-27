from flask import Flask, jsonify, request
from extensions.db import mongo


class User:

    def signup(self):
        user = request.json
        user["_id_"] = 1
        mongo.db.users.insert_one(user)
        return jsonify({"message": "User registered successfully"}), 201

    def login(self):
        user = request.json
        user = mongo.db.users.find_one(user)
        if user:
            return jsonify({"message": "User logged in successfully"}), 200
        return jsonify({"message": "Invalid credentials"}), 401
