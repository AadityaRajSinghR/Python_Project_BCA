from flask import request, jsonify, Blueprint
import string, time, random
from twilio.rest import Client
from dotenv import load_dotenv
import os

OTP_Mobile = Blueprint('OTP_Mobile', __name__)

# In-memory storage for OTP data
user_mobile_otp_data = {}

# Load environment variables
load_dotenv()
TWILIO_SID = os.getenv('TWILIO_SID')
TWILIO_TOKEN = os.getenv('TWILIO_TOKEN')
TWILIO_PHONE = os.getenv('TWILIO_PHONE')

if not all([TWILIO_SID, TWILIO_TOKEN, TWILIO_PHONE]):
    raise ValueError("Twilio environment variables are not set.")


# Twilio configuration
TWILIO_ACCOUNT_SID = TWILIO_SID
TWILIO_AUTH_TOKEN = TWILIO_TOKEN
TWILIO_PHONE_NUMBER = TWILIO_PHONE

# Initialize Twilio client
twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Function to generate a random 6-character OTP
def generate_mobile_otp(length=6):
    characters = string.ascii_letters + string.digits  # Alphanumeric characters
    otp = ''.join(random.choice(characters) for _ in range(length))  # Randomly select characters
    return otp

# Function to store OTP and its expiration time for a specific user
def store_mobile_otp(user_identifier):
    otp = generate_mobile_otp()
    expiration_time = time.time() + 300  # OTP expires in 5 minutes (300 seconds)
    user_mobile_otp_data[user_identifier] = {'otp': otp, 'expires_at': expiration_time}
    return otp

# Function to send an OTP via Twilio
def send_mobile_otp_via_service(receiver_mobile, otp):
    try:
        message = twilio_client.messages.create(
            body=f"Your OTP is: {otp}",
            from_=TWILIO_PHONE_NUMBER,
            to=  '+91' + receiver_mobile
        )
        print(f"OTP sent successfully to {receiver_mobile}, Message SID: {message.sid}")
    except Exception as e:
        print(f"Error sending OTP to {receiver_mobile}: {e}")

# Function to verify the OTP for a specific user
def verify_mobile_otp(user_identifier, input_otp):
    if user_identifier not in user_mobile_otp_data:
        return "User not found or OTP has expired."

    otp_info = user_mobile_otp_data[user_identifier]
    stored_otp = otp_info['otp']
    expires_at = otp_info['expires_at']

    if time.time() > expires_at:
        del user_mobile_otp_data[user_identifier]  # Remove expired OTP
        return "OTP has expired. Please request a new one."

    if input_otp == stored_otp:
        del user_mobile_otp_data[user_identifier]  # Remove OTP after successful verification
        return "OTP verification successful!"
    else:
        return "Incorrect OTP. Please try again."

# Route for sending OTP
@OTP_Mobile.route('/send_mobile_otp', methods=['POST'])
def send_mobile_otp_route():
    data = request.get_json()
    mobile = data.get('mobile')
    
    if mobile:
        otp = store_mobile_otp(mobile)
        send_mobile_otp_via_service(mobile, otp)
        return jsonify({'message': f"OTP sent to {mobile}"}), 200
    
    return jsonify({'message': 'Mobile number is required'}), 400

# Route for verifying OTP
@OTP_Mobile.route('/verify_mobile_otp', methods=['POST'])
def verify():
    data = request.get_json()
    mobile = data.get('mobile')
    otp = data.get('otp')
    
    if mobile and otp:
        result = verify_mobile_otp(mobile, otp)
        return jsonify({'message': result}), 200
    
    return jsonify({'message': 'Mobile number and OTP are required'}), 400

