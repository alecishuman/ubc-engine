from flask import Blueprint, Flask, request, jsonify
from user.models import User


user_bp = Blueprint("user", __name__)


@user_bp.route("/signup", methods=["POST"])
def signup():
    return User().signup()
