// Add event listener to the doctor login form if it exists
const loginDoctorForm = document.getElementById('loginDoctorForm');
if (loginDoctorForm) {
    loginDoctorForm.addEventListener('submit', handleDoctorLogin);
}
 
// Function to handle doctor login
function handleDoctorLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send a request to the server to authenticate the doctor
    fetch('http://localhost:44368/api/Doctors/Login', {  // Changed to http
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
        if (data && data['doctorID']) {
            localStorage.setItem('DoctorID', data['doctorID']);
            window.location.href = 'doctor-dashboard.html';
        } else {
            throw new Error('Invalid response data');
        }
    })
    .catch(error => {
        alert(error.message);
    });
}
