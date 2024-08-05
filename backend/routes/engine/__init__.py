from flask import Blueprint, Flask, request, jsonify, session
from flask_jwt_extended import (
    jwt_required,
    current_user,
    get_jwt_identity,
    create_access_token,
)
from models.engine import Engine

engine_bp = Blueprint("engine", __name__)


@jwt_required()
@engine_bp.route("/search", methods=["POST"])
def search():
    return Engine().get_engine_response()


@jwt_required()
@engine_bp.route("/history", methods=["GET"])
def history():
    return Engine().history()
