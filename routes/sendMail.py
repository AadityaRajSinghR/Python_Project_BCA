from flask import  request, jsonify,Blueprint
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

success_mail = Blueprint('success_mail',__name__)

# Function to send an OTP via email using smtplib
def send_message(receiver_email, username):
    sender_email = "python.mongodb1@gmail.com"  # Replace with your email
    sender_password = "ntxz arft crtd qfgt"        # Replace with your password

    subject = "ThankYou Message - AU Bank"
    body = f"Dear, \n\t {username} Thank you for creating your account.\n Now You can access your account in 2-3 days after Verification.\n\n Best regards,\n\t AU Bank"

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
        
    except Exception as e:
        print(f"Error sending email to {receiver_email}: {e}")


# Route for sending OTP
@success_mail.route('/send_msg', methods=['POST'])
def send_msg():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    
    if email:
        send_message(email, name)
        return jsonify({'message': f"Message sent to {email}"})


if __name__ == '__main__':
    success_mail.run(debug=True)
