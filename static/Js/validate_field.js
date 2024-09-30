// Array of input pairs
const inputPairs = [
    ['fullname1', 'fullname2'],
    ['dob1', 'dob2'],
    ['gender1', 'gender2'],
    ['fathername1', 'fathername2'],
    ['mothername1', 'mothername2'],
];

// Function to check if two input values match
function checkMatch(input1, input2) {
    const value1 = document.getElementById(input1).value.trim();
    const value2 = document.getElementById(input2).value.trim();

    const field1 = document.getElementById(input1);
    const field2 = document.getElementById(input2);

    // Apply valid or invalid classes based on comparison
    if (value1 === value2 && value1 !== "") {
        field1.classList.add('is-valid');
        field2.classList.add('is-valid');
        field1.classList.remove('is-invalid');
        field2.classList.remove('is-invalid');
    } else {
        field1.classList.remove('is-valid');
        field2.classList.remove('is-valid');
        field1.classList.add('is-invalid');
        field2.classList.add('is-invalid');
    }
}

// Attach input event listeners to the relevant fields
inputPairs.forEach(pair => {
    const [input1, input2] = pair;

    // Add event listeners for input and change events
    document.getElementById(input1).addEventListener('input', () => checkMatch(input1, input2));
    document.getElementById(input2).addEventListener('input', () => checkMatch(input2, input1));
});

// Check Validation for Password
// Password validation function
function validatePassword(password) {
    const minLength = 8;
    const maxLength = 16;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    // Check all conditions
    return password.length >= minLength &&
        password.length <= maxLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar;
}

// Attach input event listeners to password fields
const passwordInput = document.getElementById('create-password');
const confirmPasswordInput = document.getElementById('confirm-password');

function checkPassword() {
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Validate password
    if (validatePassword(password)) {
        passwordInput.classList.add('is-valid');
        passwordInput.classList.remove('is-invalid');
    } else {
        passwordInput.classList.remove('is-valid');
        passwordInput.classList.add('is-invalid');
    }

    // Check if confirm password matches
    if (password === confirmPassword && password !== "") {
        confirmPasswordInput.classList.add('is-valid');
        confirmPasswordInput.classList.remove('is-invalid');
    } else {
        confirmPasswordInput.classList.remove('is-valid');
        confirmPasswordInput.classList.add('is-invalid');
    }
}

// Add event listeners to password fields
passwordInput.addEventListener('input', checkPassword);
confirmPasswordInput.addEventListener('input', checkPassword);



const allfield = [
    'nominee_name1', 'nominee_contact',
    'nominee_relation', 'nominee_dob',
    'state', 'first_line1',
    'pincode1', 'email', 'mobile'
]

allfield.forEach(field => {
    document.getElementById(field).addEventListener('input', () => {
        // document.getElementById(field).required=true;
        document.getElementById(field).classList.add('is-valid');
    })
})

//select all input fields

document.querySelectorAll('input').forEach(input => {
    input.required = true; // This adds the required attribute
})
