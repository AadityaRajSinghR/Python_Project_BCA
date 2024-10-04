# Get data from mongoDB Database using python flask and show in table form

from backend.DB_connect import connect_db
from bson.objectid import ObjectId


def fetch_all_data():
    db = connect_db()  # Get the database instance
    collection = db['All_Accounts']  # Replace with your collection name
    data = list(collection.find( { 'is_active': True}))  # Fetch all documents
    return data

def fetch_new_registered_data():
    db = connect_db()  # Get the database instance
    collection = db['All_Accounts']  # Replace with your collection name
    Newdata = list(collection.find( { 'is_active': False}))  # Fetch all documents
    return Newdata


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


def account_delete(id):
    try:
        db = connect_db()  # Connect to MongoDB
        collection = db['All_Accounts']  # Replace with your collection name
        if not ObjectId.is_valid(id):
            raise ValueError("Invalid ID format")

        result = collection.delete_one({'_id': ObjectId(id)})
        return result.deleted_count > 0  # Return True if the account was deleted
    except Exception as e:
        print(f"Error in account_delete function: {str(e)}")
        raise  # Re-raise the exception for further handling

