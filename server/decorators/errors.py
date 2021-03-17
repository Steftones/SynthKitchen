from app import app
from flask import Flask, jsonify
from marshmallow.exceptions import ValidationError

@app.errorhandler(ValidationError)
def validation_error(e):
    return { 'errors': e.messages, "messages": "something went wrong" }

@app.errorhandler(Exception)
def exception_error(e):
    return { 'errors': str(e), "messages": "something went wrong" }