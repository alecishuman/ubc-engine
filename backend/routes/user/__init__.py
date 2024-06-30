from flask import Blueprint, Flask, request, jsonify, session
from flask_jwt_extended import (
    jwt_required,
    current_user,
    get_jwt_identity,
    create_access_token,
)
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
    return User().logout()


@user_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    return jsonify(
        {
            "email": current_user.get("email"),
            "firstName": current_user.get("firstName"),
            "lastName": current_user.get("lastName"),
        }
    )


@user_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify({"access_token": access_token}), 200
