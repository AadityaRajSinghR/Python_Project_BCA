from flask import request, jsonify, Blueprint, session
from backend.getData import account_activate,account_delete

admin_dashboard = Blueprint('admin_dashboard', __name__)

@admin_dashboard.route('/accept', methods=['POST'])
def accept():
    if request.method == 'POST':
        data = request.get_json()

        if account_activate(data['id']):
            return jsonify({'message': 'Account activated successfully'})

        return jsonify({'error': 'Account not found or already activated'}), 404

    return jsonify({'error': 'Invalid request'})


@admin_dashboard.route('/reject', methods=['POST'])
def reject():
    if request.method == 'POST':
        data = request.get_json()

        if account_delete(data['id']):
            return jsonify({'message': 'Account rejected successfully'})

        return jsonify({'error': 'Account not found or already rejected'}), 404

    return jsonify({'error': 'Invalid request'})
