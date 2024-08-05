from flask import Flask, jsonify, request
from extensions.db import mongo
import bcrypt
from flask_jwt_extended import create_access_token, create_refresh_token


class Engine:
    def get_engine_response(id):
        return (
            jsonify(
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
            ),
            200,
        )

    def history(self):
        return (
            jsonify(
                {
                    "history": [
                        {"title": "random title", "chat_id": 1},
                        {"title": "another search title", "chat_id": 2},
                    ]
                }
            ),
            200,
        )
