from flask import Flask, jsonify, render_template
from flask_cors import CORS
from flask_pymongo import PyMongo
from extensions import mongo, jwt
import os
from dotenv import load_dotenv, dotenv_values
from datetime import timedelta
from flask_jwt_extended import (
    jwt_required,
    get_jwt,
    get_jwt_identity,
    unset_jwt_cookies,
    current_user,
)

load_dotenv()


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["MONGO_URI"] = os.getenv("DB_URI")
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

    # init app
    mongo.init_app(app)
    jwt.init_app(app)

    # Load blueprints
    from routes.user import user_bp
    from routes.engine import engine_bp

    app.register_blueprint(user_bp, url_prefix="/user")
    app.register_blueprint(engine_bp, url_prefix="/engine")

    @app.route("/engine/<int:id>", methods=["GET"])
    def get_engine_response(id):
        return jsonify(
            {
                "message": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "links": [
                    {"name": "Google", "url": "https://www.google.com"},
                    {"name": "Wikipedia", "url": "https://www.wikipedia.com"},
                    {
                        "name": "Material UI",
                        "url": "https://mui.com/material-ui/icons/",
                    },
                ],
                "questions": [
                    "What is Lorem Ipsum?",
                    "Why do we use it?",
                    "Where does it come from?",
                ],
            }
        )

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=8080)
