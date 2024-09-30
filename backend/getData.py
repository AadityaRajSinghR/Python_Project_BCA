# Get data from mongoDB Database using python flask and show in table form

from backend.DB_connect import connect_db

def fetch_all_data():
    db = connect_db()  # Get the database instance
    collection = db['mycollection']  # Replace with your collection name
    data = list(collection.find())  # Fetch all documents
    return data
