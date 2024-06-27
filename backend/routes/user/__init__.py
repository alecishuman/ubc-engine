from flask import Blueprint, Flask, request, jsonify
from models.user import User


user_bp = Blueprint("user", __name__)


@user_bp.route("/login", methods=["POST"])
def login():
    return User().login()


@user_bp.route("/signup", methods=["POST"])
def signup():
    return User().signup()
