const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');
const filds = document.querySelectorAll('.filds');
let currentActive = 1;

next.addEventListener('click', () => {
    // Select both input fields and select elements within .activeflds
    const activeflds = document.querySelectorAll('.activeflds input, .activeflds select');

    let allFilled = true; // Flag to check if all fields are filled

    activeflds.forEach((activefld) => {
        // Check if the field is empty
        if (!activefld.value) {
            allFilled = false; // If any field is empty, set the flag to false
        }
    });

    if (!allFilled) {
        alert('Please fill all fields'); // Alert if any field is empty
    } else {
        if (currentActive < circles.length) {
            currentActive++;
            update(); // Call your update function only if all fields are filled
        }
    }
});

prev.addEventListener('click', () => {
    if (currentActive > 1) {
        currentActive--;
        update();
    }
});

function update() {
    circles.forEach((circle, idx) => {
        circle.classList.toggle('active', idx < currentActive);
    });

    filds.forEach((fild, idx) => {
        fild.classList.toggle('activeflds', idx === currentActive - 1);
    });

    const actives = document.querySelectorAll('.active');
    progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + '%';

    prev.disabled = currentActive === 1;
    if (currentActive === circles.length) {
        next.innerText = 'Submit';
    } else {
        next.innerText = 'Next';
    }
}


next.disabled = currentActive === 1;

function check_account() {
    const account_number = document.getElementById('account_number').value;
    const check_account_btn = document.getElementById('check_account_btn');
    if (!account_number) {
        alert('Please enter account number');
        return;
    }
    fetch('/check_account', {
        method: 'POST',
        body: JSON.stringify({ account_number: account_number }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data['status'] === 'success') {
                alert(data.message);
                check_account_btn.disabled = true;
                check_account_btn.style.backgroundColor = "lightgrey";
                next.disabled = false;
                fetchData = data.details
                console.log(fetchData);
                const ac_details = [
                    fetchData['fullname1'],
                    fetchData['dob1'],
                    fetchData['gender1'],
                    fetchData['fathername1'],
                    fetchData['mothername1'],
                    fetchData['mobile'],
                    fetchData['email'],
                    fetchData['first_line1'],
                    fetchData['state'],
                    fetchData['pincode1'],
                ]
                const ac_fields = [
                    'personal_fullname', 'personal_dob',
                    'personal_gender', 'personal_fathername',
                    'personal_mothername', 'contact_mobile',
                    'contact_email', 'contact_address1', 'contact_state', 'contact_pincode'
                ]
                for (let i = 0; i < ac_fields.length; i++) {
                    document.getElementById(ac_fields[i]).value = ac_details[i];
                    document.getElementById(ac_fields[i]).disabled = true;
                    document.getElementById(ac_fields[i]).style.backgroundColor = "lightgrey";
                }
            } else {
                alert("Account does not exist");
            }
        });
}


function genrate_loan_reques() {
    // Generate a random 14-digit Account number
    const randomNumber = Math.floor(Math.random() * 1e14).toString().padStart(14, '0');
    return randomNumber;
}


function uploadData() {
    const fields = [
        'account_number', 'personal_fullname', 'personal_dob', 'personal_gender', 'personal_marital_status',
        'personal_fathername', 'personal_mothername', 'contact_mobile', 'contact_email', 'contact_address1',
        'contact_address2', 'contact_state', 'contact_pincode', 'identification_aadhar', 'identification_pan',
        'employment_status', 'net_monthly_income', 'monthly_housing_income', 'loan_amount', 'loan_term',
        'outstanding_loans', 'outstanding_loan_amount', 'repayment_installments', 'guarantor_fullname', 'guarantor_dob',
        'guarantor_relationship', 'guarantor_mobile', 'guarantor_email', 'guarantor_address1', 'guarantor_address2',
        'guarantor_state', 'guarantor_pincode'
    ];

    const data = {};
    fields.forEach((field) => {
        const element = document.getElementById(field);
        if (element) {
            data[field] = element.value;
        } else {
            console.warn(`Element with id ${field} not found.`);
        }
    });

    data.loanType = document.querySelector('input[name="LoanType"]:checked').value;
    data.address = data.contact_address1 + ' ' + data.contact_address2;
    data.guarantor_address = data.guarantor_address1 + ' ' + data.guarantor_address2;
    data.account_number = genrate_loan_reques();

    fetch('/upload_data', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Data uploaded successfully');
        } else {
            alert('Failed to upload data');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while uploading data');
    });
}

next.addEventListener('click', () => {
    if (currentActive === circles.length+1) {
        uploadData();
    }
});