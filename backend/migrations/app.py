from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db
from routes import api
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db.init_app(app)

app.register_blueprint(api, url_prefix='/api')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # initialize the database
    app.run(debug=True)
