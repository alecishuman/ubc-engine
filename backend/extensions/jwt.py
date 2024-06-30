from flask import jsonify
from flask_jwt_extended import JWTManager
from .db import mongo

jwt = JWTManager()


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return mongo.db.users.find_one({"email": identity})


@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_data):
    return jsonify({"message": "Token has expired", "error": "Token has expired"}), 401


@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"message": "Invalid token", "error": "Invalid token"}), 401


@jwt.unauthorized_loader
def unauthorized_callback(error):
    return (
        jsonify({"message": "Missing Authorization Header", "error": "Unauthorized"}),
        401,
    )
