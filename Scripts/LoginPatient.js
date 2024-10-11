const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', handlePatientLogin);
}

// Function to handle patient login
function handlePatientLogin(event) {
    event.preventDefault();  // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send a request to the server to authenticate the patient
    fetch('http://localhost:44368/api/Patients/Login', {  // Ensure the URL matches your backend
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json()) 
    .then(data => {
        if (data && data['patientID']) {
            localStorage.setItem('PatientID', data['patientID']);  // Store patient ID in localStorage
            window.location.href = 'patient-dashboard.html';  // Redirect to patient dashboard
        } else {
            throw new Error('Invalid response data');
        }
    })
    .catch(error => {
        alert(error.message);  // Show error message if login fails
    });
}
