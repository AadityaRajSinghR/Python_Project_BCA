const admin = document.getElementById('admin');
const login = document.getElementById('login');


// General login click handler
login.addEventListener('click', () => {
    if (admin.checked) {
        adminLogin();
    } else {
        userLogin();
    }
});

// Admin login function
function adminLogin() {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('/admin_login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,

        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Login successful!') {
                alert(data.message + ' Redirecting...');
                window.location.href = '/Dashboard';
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function userLogin() {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('/user_login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful!') {
            alert(data.message + ' Redirecting...');
            window.location.href = '/user_dashboard';  // Redirect to user dashboard
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.log(error);
    });
}
