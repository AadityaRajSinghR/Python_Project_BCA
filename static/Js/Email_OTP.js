// Function to handle sending OTP
let timerId;
let success = false;

async function sendOtp(event) {
    let timeLeft = 300; // Timer starts from 300 seconds
    event.preventDefault();  // Prevent form from refreshing the page

    const email = document.getElementById('email').value;
    const sendMailOtpButton = document.getElementById('sendMailOtp');

    // Validate email format
    if (!Mailvalidation(email)) {
        return;
    } else {
        document.getElementById('emailError').innerText = '';
    }

    try {

        // Disable the button and start timer
        sendMailOtpButton.disabled = true;
        document.getElementById('email').readOnly = true;
        document.getElementById('email').disabled = true;
        document.getElementById('email').style.backgroundColor = '#00000024';
        sendMailOtpButton.style.backgroundColor = '#D5A2A0';
        startTimer(sendMailOtpButton);

        // Send OTP via Fetch API
        const response = await fetch('/send_otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });

        if (!response.ok) {
            // Handle error response
            const data = await response.json();
            document.getElementById('emailError').innerText = data.message || 'Failed to send OTP.';
            return;
        }
        document.getElementById('emailError').innerText = 'OTP sent successfully!';

    } catch (error) {
        // Handle network errors
        console.error('Error sending OTP:', error);
        document.getElementById('emailError').innerText = 'An error occurred while sending the OTP.';
    }
}

function startTimer(button) {
    //only one timer runs at a time
    if (timerId) {
        clearInterval(timerId);
    }

    timerId = setInterval(function () {
        // Decrease the time and update the timer display
        timeLeft--;
        button.innerText = `Resend in ${timeLeft} seconds`;

        // When time reaches 0, stop the timer and reset
        if (timeLeft <= 0 && !success) {
            clearInterval(timerId); // Stop the timer
            button.disabled = false;
            button.style.backgroundColor = '#B03A37';
            button.innerText = 'Resend';
            timeLeft = 300; // Reset the timer for the next click
            enableEmailInput();

        }
    }, 1000);
}

function enableEmailInput() {
    const EmailInput = document.getElementById('email');
    EmailInput.readOnly = false;
    EmailInput.disabled = false;
    EmailInput.style.backgroundColor = '';
}

function Mailvalidation(email) {
    const re = /^[^\s@]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|avantika\.edu\.in)$/;

    if (!email) {
        document.getElementById('emailError').innerText = 'Please enter your email.';
        return false;
    }

    if (!re.test(email)) {
        document.getElementById('emailError').innerText = 'Please enter a valid email address.';
        return false;
    }
    return true;
}




// Function to handle verifying OTP
emailOtp.addEventListener('blur', verifyOtp);
async function verifyOtp(event) {
    event.preventDefault();  // Prevent form from refreshing the page

    const email = document.getElementById('email').value;
    const otp = document.getElementById('emailOtp').value;

    try {
        // Verify OTP via Fetch API
        const response = await fetch('/verify_otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, otp: otp })
        });

        const data = await response.json();

        // OTP verification success
        if (data.message === 'OTP verification successful!') {
            document.getElementById('message').style.color = 'green';
            document.getElementById('emailOtp').readOnly = true;
            document.getElementById('emailOtp').disabled = true;
            document.getElementById('emailOtp').style.backgroundColor = '#00000024';
            document.getElementById('emailOtp').classList.add('is-valid');
            document.getElementById('emailOtp').style.cursor = 'not-allowed';


            document.getElementById('email').disabled = true;
            document.getElementById('email').style.backgroundColor = '#00000024';
            document.getElementById('email').readOnly = true;
            document.getElementById('email').classList.add('is-valid');
            document.getElementById('email').style.cursor = 'not-allowed';

            document.getElementById('sendMailOtp').disabled = true;
            document.getElementById('sendMailOtp').style.backgroundColor = '#D5A2A0';
            document.getElementById('sendMailOtp').innerText = 'Verified';
            document.getElementById('sendMailOtp').style.cursor = 'not-allowed';
            success = true;


        } else {
            // OTP verification failure (e.g., incorrect OTP)
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerText = data.message || 'OTP verification failed.';
        }
    } catch (error) {
        // Handle network or unexpected errors
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerText = 'An error occurred during OTP verification.';
        console.error('Error verifying OTP:', error);
    }
}
