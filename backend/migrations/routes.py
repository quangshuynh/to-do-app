from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask import Flask, jsonify, request

app.config["JWT_SECRET_KEY"] = "your-secret-key"
jwt = JWTManager(app)

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        token = create_access_token(identity=user.id)
        return jsonify({"token": token}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@api.route('/tasks', methods=['GET', 'POST'])
@jwt_required()
def manage_tasks():
    current_user = get_jwt_identity()
    if request.method == 'POST':
        data = request.json
        task = Task(
            title=data['title'],
            description=data.get('description', ''),
            user_id=current_user
        )
        db.session.add(task)
        db.session.commit()
        return jsonify({"message": "Task created successfully"}), 201

    tasks = Task.query.filter_by(user_id=current_user).all()
    return jsonify([{
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "status": task.status
    } for task in tasks])
