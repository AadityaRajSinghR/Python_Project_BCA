# Delete_account Code
from flask import Blueprint, session, jsonify, request

from backend.getData import account_delete

Delete_account = Blueprint('Delete_account', __name__)


@Delete_account.route('/delete', methods=['POST'])
def Delete_account_page():
    adminLog = session.get('is_admin', None)  # Check admin session data
    if adminLog:
        try:
            data = request.json  # Retrieve JSON data
            if account_delete(data['id']):
                return jsonify({'message': 'Account deleted successfully'}), 200
            else:
                return jsonify({'error': 'Account not found or already deleted'}), 404
        except Exception as e:
            print(f"Error deleting account: {str(e)}")
            return jsonify({'error': f"An internal server error occurred: {str(e)}"}), 500
    else:
        return jsonify({'error': 'Unauthorized access'}), 403
