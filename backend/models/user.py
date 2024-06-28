from flask import Flask, jsonify, request, session
from extensions.db import mongo
import bcrypt

class User:

    def signup(self):
        users = mongo.db.users
        req = request.json
        signup_user = users.find_one({"email": req["email"]})
        if signup_user:
            return jsonify({"error": "User already exists"}), 409
        hashed = bcrypt.hashpw(req["password"].encode("utf-8"), bcrypt.gensalt(14))
        users.insert_one(
            {
                "firstName": req["firstName"],
                "lastName": req["lastName"],
                "password": hashed,
                "email": req["email"],
            }
        )
        return jsonify({"message": "User created successfully"}), 201

    def login(self):
        req = request.json
        user = mongo.db.users.find_one({"email": req["email"]})
        if user:
            if bcrypt.checkpw(req["password"].encode("utf-8"), user["password"]):
                return jsonify({"message": "User logged in successfully"}), 200
        return jsonify({"error": "Invalid credentials"}), 401
