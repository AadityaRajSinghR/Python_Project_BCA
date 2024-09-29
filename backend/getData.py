# i want to get data from mongoDB Database using python flask and shoe on webpage in table form

from backend.DB_connect import get_db

def fetch_all_data():
    db = get_db()  # Get the database instance
    collection = db['mycollection']  # Replace with your collection name
    data = list(collection.find())  # Fetch all documents
    return data
