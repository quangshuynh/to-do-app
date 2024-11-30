from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models import db
from routes import api

# initialize the app
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# configure JWT
app.config["JWT_SECRET_KEY"] = "your-secret-key"
jwt = JWTManager(app)

# initialize SQLAlchemy
db.init_app(app)

# register Blueprint
app.register_blueprint(api, url_prefix='/api')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # initialize database
    app.run(debug=True)
