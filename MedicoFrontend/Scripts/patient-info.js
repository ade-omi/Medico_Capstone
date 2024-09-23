// Function to display patient information
function displayPatientInfo(patientData) {
    const patientInfoContainer = document.getElementById('patientInfo');
    patientInfoContainer.innerHTML = `
        <p>Username: ${patientData.UserName}</p>
        <p>Phone Number: ${patientData.PhoneNumber}</p>
        <p>Date of Birth: ${patientData.DateOfBirth}</p>
        <p>Health Card Number: ${patientData.HealthCardNumber}</p>
        <p>Email: ${patientData.Email}</p>
        <p>First Name: ${patientData.FirstName}</p>
        <p>Last Name: ${patientData.LastName}</p>
        <p>Gender: ${patientData.Gender}</p>
        <button onclick="editPatient()">Edit Patient Info</button>
    `;

    patientData.array.forEach(element => {
        element[appointments].forEach(appointment => {
            appointment
        })
    });
}

function editPatient() {
    // Redirect to display.html with the patient ID
    const queryParams = new URLSearchParams(window.location.search);
    const patientId = queryParams.get('patientId');
    window.location.href = `display.html?patientId=${patientId}`;
}

// This function should be modified to fetch the actual patient data from the backend
function fetchPatientInfo() {
    fetch(`https://localhost:44368/api/Patients/Dashboard?patientID=${localStorage.getItem('patientID')}`)
    .then(response => response.json())
    .then(patientData => {
        displayPatientInfo(patientData);
    })
    .catch(error => {
        console.error('Error fetching patient information:', error);
    });
}

document.addEventListener('DOMContentLoaded', fetchPatientInfo);