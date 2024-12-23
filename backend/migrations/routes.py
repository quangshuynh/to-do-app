from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from models import User, Task, db
from werkzeug.security import check_password_hash, generate_password_hash

api = Blueprint('api', __name__)

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        token = create_access_token(identity=user.id)
        return jsonify({"token": token}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@api.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data.get('username') or not data.get('password'):
        return jsonify({"message": "Username and password are required"}), 400

    # Check if username already exists
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({"message": "Username already exists"}), 400

    # Use a valid hash method (default is 'pbkdf2:sha256')
    hashed_pw = generate_password_hash(data['password'])  # Default is pbkdf2:sha256
    user = User(username=data['username'], password=hashed_pw)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201


@api.route('/tasks', methods=['POST'])
@jwt_required()
def manage_tasks():
    current_user = get_jwt_identity()
    data = request.json
    print("Received data:", data)  # Debug log

    if request.method == 'POST':
        if not data.get('title'):
            return jsonify({"message": "Task title is required"}), 400

        task = Task(
            title=data['title'],
            description=data.get('description', ''),
            user_id=current_user
        )
        db.session.add(task)
        db.session.commit()
        print("Task added:", task)  # Debug log
        return jsonify({"message": "Task created successfully"}), 201


    # Handle GET request: Fetch all tasks for the current user
    tasks = Task.query.filter_by(user_id=current_user).all()
    return jsonify([
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "status": task.status,
        }
        for task in tasks
    ])