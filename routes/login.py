from flask import request, jsonify, Blueprint, session
from backend.getData import user_find_email,admin_find_email

login = Blueprint('login', __name__)

@login.route('/user_login', methods=['POST'])
def user_login_route():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        result = user_find_email(email, password)
        if result:
            session['user'] = result  # Store user data in the session
            session['email'] = email  # Store email in the session
            return jsonify({'message': 'Login successful!'})
        else:
            return jsonify({'message': 'Invalid email or password'})        
    return jsonify({'message': 'Invalid request'})


@login.route('/admin_login', methods=['POST'])
def admin_login_route():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        result = admin_find_email(email, password)
        if result:
            session['user'] = result  # Store user data in the session
            session['email'] = email  # Store email in the session
            session['is_admin'] = True
            return jsonify({'message': 'Login successful!'})
        else:
            return jsonify({'message': 'Invalid email or password'})        
    return jsonify({'message': 'Invalid request'})





