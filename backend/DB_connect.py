#connect Database
from pymongo import MongoClient


import os
from dotenv import load_dotenv
# Load environment variables from .env file
load_dotenv()
# Get the DB_PASS from environment variables
DB_PASS = os.getenv('DB_PASS')
if not DB_PASS:
    raise ValueError("Environment variable DB_PASS not set.")

def connect_db():
    # MongoDB connection string (replace with your own)
    client = MongoClient(f'mongodb+srv://Python_Mongo:{DB_PASS}@pythonproject.mc1qw.mongodb.net/')
    db = client['mydatabase']  # Replace with your DB name
    return db
