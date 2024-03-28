// Function to handle form submission for patient information
function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const prescriptions = document.getElementById('prescriptions').value;
    const medicines = document.getElementById('medicines').value;

    // Send patient data to the server to store in the MySQL database
    fetch('/api/patient-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, gender, dob, email, prescriptions, medicines })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save patient information');
        }
        // Redirect to display page after successful submission
        window.location.href = 'display.html';
    })
    .catch(error => {
        alert(error.message);
    });
}

// Function to handle patient login
function handlePatientLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send a request to the server to authenticate the patient
    fetch('/api/login-patient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        // Redirect to patient-info.html upon successful login
        window.location.href = 'patient-info.html';
    })
    .catch(error => {
        alert(error.message);
    });
}

// Add event listener to the patient form and login form if they exist
const patientForm = document.getElementById('patientForm');
if (patientForm) {
    patientForm.addEventListener('submit', handleSubmit);
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', handlePatientLogin);
}