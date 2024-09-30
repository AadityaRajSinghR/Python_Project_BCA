const OTP_TIME_LIMIT = 10; // Timer starts from 10 seconds
let OTPtimeLeft = OTP_TIME_LIMIT; 
let OTPtimerId;

async function sendMobileOtp(event) {
    event.preventDefault();  // Prevent form from refreshing the page

    const mobile = document.getElementById('mobile').value;
    const sendMobileOtpButton = document.getElementById('sendMobileOtp');
    const mobileErrorElement = document.getElementById('mobileError');

    // Validate mobile format
    if (!Mobilevalidation(mobile)) {
        return;
    } else {
        mobileErrorElement.innerText = ''; // Clear previous error messages
    }

    try {
        // Disable the button and start the timer
        disableSendButton(sendMobileOtpButton);
        startTimer(sendMobileOtpButton);

        // Send OTP via Fetch API
        const response = await fetch('/send_mobile_otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile })
        });

        if (!response.ok) {
            // Handle error response
            const data = await response.json();
            mobileErrorElement.innerText = data.message || 'Failed to send OTP.';
            return;
        }

        // Optionally, show a success message here
        mobileErrorElement.innerText = 'OTP sent successfully!';

    } catch (error) {
        console.error('Error sending OTP:', error);
        mobileErrorElement.innerText = 'An error occurred while sending the OTP.';
    }
}

function startTimer(button) {
    OTPtimerId = setInterval(() => {
        OTPtimeLeft--;
        button.innerText = `Resend in ${OTPtimeLeft} seconds`;

        if (OTPtimeLeft <= 0) {
            clearInterval(OTPtimerId);
            resetButton(button);
        }
    }, 1000);
}

function resetButton(button) {
    button.disabled = false;
    button.style.backgroundColor = '#B03A37';
    button.innerText = 'Resend';
    OTPtimeLeft = OTP_TIME_LIMIT; // Reset the timer for the next click
    enableMobileInput();
}

function disableSendButton(button) {
    button.disabled = true;
    document.getElementById('mobile').readOnly = true;
    document.getElementById('mobile').disabled = true;
    document.getElementById('mobile').style.backgroundColor = '#00000024';
    button.style.backgroundColor = '#D5A2A0';
}

function enableMobileInput() {
    const mobileInput = document.getElementById('mobile');
    mobileInput.readOnly = false;
    mobileInput.disabled = false;
    mobileInput.style.backgroundColor = '';
}

function Mobilevalidation(mobile) {
    const re = /^\d{10}$/; // Example for 10-digit mobile number
    const mobileErrorElement = document.getElementById('mobileError');

    if (!mobile) {
        mobileErrorElement.innerText = 'Please enter your mobile.';
        return false;
    }

    if (!re.test(mobile)) {
        mobileErrorElement.innerText = 'Please enter a valid mobile number.';
        return false;
    }
    return true;
}

// Function to handle verifying OTP
document.getElementById('mobileOtp').addEventListener('blur', verifyOtp);

async function verifyOtp(event) {
    event.preventDefault();  // Prevent form from refreshing the page

    const mobile = document.getElementById('mobile').value;
    const otp = document.getElementById('mobileOtp').value;

    try {
        // Verify OTP via Fetch API
        const response = await fetch('/verify_mobile_otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile, otp })
        });

        const data = await response.json();
        const messageElement = document.getElementById('OTPmessage');
        
        if (data.message === 'OTP verification successful!') {
            messageElement.style.color = 'green';
            disableAllInputs();
        } else {
            messageElement.style.color = 'red'; // Indicate error in red
        }
        messageElement.innerText = data.message;

    } catch (error) {
        console.error('Error verifying OTP:', error);
        document.getElementById('message').innerText = 'An error occurred while verifying the OTP.';
    }
}

function disableAllInputs() {
    document.getElementById('mobileOtp').readOnly = true;
    document.getElementById('mobileOtp').disabled = true;
    document.getElementById('sendMobileOtp').disabled = true;
    document.getElementById('sendMobileOtp').style.backgroundColor = '#D5A2A0';
    document.getElementById('mobile').style.backgroundColor = '#00000024';
    document.getElementById('mobile').readOnly = true;
    document.getElementById('mobile').disabled = true;
}
