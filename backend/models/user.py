from flask import Flask, jsonify, request
from extensions.db import mongo


class User:

    def signup(self):
        user = request.json
        user["_id_"] = 1
        mongo.db.users.insert_one(user)
        return jsonify({"message": "User registered successfully"}), 201
