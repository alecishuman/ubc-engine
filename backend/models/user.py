from flask import Flask, jsonify, request
from extensions.db import mongo
import bcrypt
from flask_jwt_extended import create_access_token, create_refresh_token

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
        if user and bcrypt.checkpw(req["password"].encode("utf-8"), user["password"]):
            access_token = create_access_token(identity=req["email"])
            refresh_token = create_refresh_token(identity=req["email"])
            return (
                jsonify(
                    {
                        "tokens": {
                            "access_token": access_token,
                            "refresh_token": refresh_token,
                        },
                        "message": "User logged in successfully",
                    }
                ),
                200,
            )
        return jsonify({"error": "Invalid credentials"}), 401
