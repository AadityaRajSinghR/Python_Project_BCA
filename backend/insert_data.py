from flask import Blueprint, request, jsonify

insert_data = Blueprint('insert_data', __name__)

# Insert Data in DataBase
from backend.DB_connect import connect_db
db = connect_db()  # Get the database instance

@insert_data.route('/insert_data', methods=['POST'])
def insert_data_route():
    
    data = request.json # Retrieve JSON data from the request
    collection = db['All_Accounts']
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    collection.insert_one(data)
    
    return jsonify({"message": "Your Account Open Request has been submitted"}), 201
    
    
