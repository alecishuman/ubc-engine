from flask import Blueprint, Flask, request, jsonify, session
from models.user import User


user_bp = Blueprint("user", __name__)


@user_bp.route("/login", methods=["POST"])
def login():
    return User().login()


@user_bp.route("/signup", methods=["POST"])
def signup():
    return User().signup()


@user_bp.route("/logout")
def logout():
    session.pop("email", None)
    return jsonify({"message": "User logged out successfully"}), 200
