from flask import  request, jsonify,Blueprint
import random, smtplib, time, string
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

OTP_s = Blueprint('OTP_s',__name__)

# In-memory storage for OTP data
user_otp_data = {}

# Function to generate a random 6-digit OTP
def generate_otp(length=6):
    characters = string.ascii_letters + string.digits  # Alphanumeric characters (letters and digits)
    otp = ''.join(random.choice(characters) for _ in range(length))
    return otp

# Function to store OTP and its expiration time for a specific user
def store_otp(user_identifier):
    otp = generate_otp()
    expiration_time = time.time() + 300  # OTP expires in 5 minutes (300 seconds)
    user_otp_data[user_identifier] = {'otp': otp, 'expires_at': expiration_time}
    return otp

# Function to send an OTP via email using smtplib
def send_email_otp(receiver_email, otp):
    sender_email = "python.mongodb1@gmail.com"  # Replace with your email
    sender_password = "ntxz arft crtd qfgt"        # Replace with your password

    subject = "Your OTP Code"
    body = f"Your OTP code is {otp}. It will expire in 5 minutes."

    # Set up the MIME
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = subject

    message.attach(MIMEText(body, 'plain'))

    try:
        # Connect to the SMTP server
        smtp_server = smtplib.SMTP('smtp.gmail.com', 587)  # Using Gmail's SMTP server
        smtp_server.starttls()  # Enable security
        smtp_server.login(sender_email, sender_password)  # Login with your email credentials
        smtp_server.sendmail(sender_email, receiver_email, message.as_string())  # Send email
        smtp_server.quit()
        print(f"OTP sent successfully to {receiver_email}")
    except Exception as e:
        print(f"Error sending email to {receiver_email}: {e}")

# Function to verify the OTP for a specific user
def verify_otp(user_identifier, input_otp):
    # Check if the user exists in the OTP data
    if user_identifier not in user_otp_data:
        return "User not found or OTP has expired."

    otp_info = user_otp_data[user_identifier]
    stored_otp = otp_info['otp']
    expires_at = otp_info['expires_at']

    # Check if OTP has expired
    if time.time() > expires_at:
        del user_otp_data[user_identifier]  # Remove expired OTP
        return "OTP has expired. Please request a new one."

    # Check if the input OTP matches the stored OTP
    if input_otp == stored_otp:
        del user_otp_data[user_identifier]  # Remove OTP after successful verification
        return "OTP verification successful!"
    else:
        return "Incorrect OTP. Please try again."

# Route for sending OTP
@OTP_s.route('/send_otp', methods=['POST'])
def send_otp():
    data = request.get_json()
    email = data.get('email')
    
    if email:
        otp = store_otp(email)
        send_email_otp(email, otp)
        return jsonify({'message': f"OTP sent to {email}"})
    
    return jsonify({'message': 'Email is required'}), 400

# Route for verifying OTP
@OTP_s.route('/verify_otp', methods=['POST'])
def verify():
    data = request.get_json()
    email = data.get('email')
    otp = data.get('otp')
    
    if email and otp:
        result = verify_otp(email, otp)
        return jsonify({'message': result})
    
    return jsonify({'message': 'Email and OTP are required'}), 400


if __name__ == '__main__':
    OTP_s.run(debug=True,port=3000)
