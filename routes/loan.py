from flask import Flask, request, jsonify, Blueprint
from backend.getData import fetch_account_data

loan_app = Blueprint('loan_app', __name__)

@loan_app.route('/check_account', methods=['POST'])
def check_account():
    # Get the JSON data from the request
    data = request.get_json()
    
    # Extract account_number from the data
    account_number = data.get('account_number') if data else None
    
    if not account_number:
        return jsonify({"error": "Account number is required"}), 400

    account = fetch_account_data(account_number)

    if account:
        return jsonify({"message": "Account number is present", "details": account, "status": "success"}), 200
    else:
        return jsonify({"message": "Account number is not present"}), 404


