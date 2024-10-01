const insertData = document.getElementById("insertData");
let verified = 0;
const data = {}; // Create an empty object
//Current Date and Time
const date = new Date();
const current_date = date.toLocaleDateString();
const current_time = date.toLocaleTimeString();


// Function to generate a random 10-digit Customer ID

function genrate_Customer_id_fun() {
    // Generate a random 10-digit Customer ID
    const randomNumber = Math.floor(Math.random() * 1e10).toString().padStart(10, '0');
    return randomNumber;
}

function genrate_Account_no_fun() {
    // Generate a random 14-digit Account number
    const randomNumber = Math.floor(Math.random() * 1e14).toString().padStart(14, '0');
    return randomNumber;
}

const IFCS_code = ['AUBU100', 'AUBN200', 'AUBI300'];

// Generate a random IFCS code
function get_IFCS_code() {
    return IFCS_code[Math.floor(Math.random() * IFCS_code.length)];
}


insertData.addEventListener("click", () => {
    const allFields = [
        'country', 'occupation',
        'nominee_name1', 'nominee_contact',
        'nominee_relation', 'nominee_dob',
        'state', 'first_line1',
        'pincode1', 'email',
        'mobile', 'fullname1',
        'dob1', 'gender1',
        'fathername1', 'mothername1',
        'create-password',
        'doc_num1', 'document',
        'doc_file', 'Photo',
    ];

    data['Customer_id'] = genrate_Customer_id_fun();
    data['IFCS'] = get_IFCS_code();
    data['account_no'] = genrate_Account_no_fun();
    data['Open_date'] = current_date;
    data['Open_time'] = current_time;

    allFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {


            // Check if the field has the class 'is-valid'
            if (field.classList.contains('is-valid')) {
                const fieldValue = field.value;
                console.log(fieldValue, ':', fieldName);
                data[fieldName] = fieldValue;
                verified++;
            }
        } else {
            console.error(`Field with ID '${fieldName}' not found.`);
        }
    });




    console.log('Number of verified fields:', verified);
    if (verified < 17) {
        alert('Please fill all required fields.');

    } else {

        console.log('Inserted data:', data);

        // Send the data to the server

        fetch('/insert_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                // console.log('Server response:', data);
                alert(data.message || 'Data inserted successfully');
                sendmail();

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});

function sendmail() {
    const msg_data = {
        'email': document.getElementById('email').value,
        'name': document.getElementById('fullname1').value
    }
    fetch('/send_msg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(msg_data)
    })
        .then(response => response.json())
        .then(msg_data => {
            // console.log('Server response:', msg_data);
            alert(msg_data.message || 'Check your mail');

        })
        .catch(error => {
            console.error('Error:', error);
        });

}