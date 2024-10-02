# Get data from mongoDB Database using python flask and show in table form

from backend.DB_connect import connect_db
from werkzeug.security import check_password_hash
from bson import ObjectId  # Import for handling ObjectId

def fetch_all_data():
    db = connect_db()  # Get the database instance
    collection = db['All_Accounts']  # Replace with your collection name
    data = list(collection.find())  # Fetch all documents
    return data


def user_find_email(email, password):
    db = connect_db()  
    collection = db['All_Accounts']
    user = collection.find_one({"email": email})  # Find user by email
    
    # Check if user exists and if password matches
    if user and (user['create-password'], password) and user['is_active'] == True:
        user['_id'] = str(user['_id'])  # Convert ObjectId to string
        return user  # Return the user data
    
    return None

def admin_find_email(email, password):
    db = connect_db()  
    collection = db['admin_data']
    user = collection.find_one({"email": email})  # Find user by email
    
    # Check if user exists and if password matches
    if user and (user['create-password'], password):
        user['_id'] = str(user['_id'])  # Convert ObjectId to string
        return user  # Return the user data
    
    return None
