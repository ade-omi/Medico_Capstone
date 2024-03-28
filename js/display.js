// Retrieve patient data from localStorage
let patientData = JSON.parse(localStorage.getItem('patientData'));

// Function to display patient information
function displayPatientInfo() {
    const patientInfoContainer = document.getElementById('patientInfo');
    patientInfoContainer.innerHTML = '';

    if (patientData) {
        const nameElement = document.createElement('p');
        nameElement.textContent = `Name: ${patientData.name}`;

        const genderElement = document.createElement('p');
        genderElement.textContent = `Gender: ${patientData.gender}`;

        const dobElement = document.createElement('p');
        dobElement.textContent = `Date of Birth: ${patientData.dob}`;

        const emailElement = document.createElement('p');
        emailElement.textContent = `Email: ${patientData.email}`;

        const prescriptionsElement = document.createElement('p');
        prescriptionsElement.textContent = `Prescriptions: ${patientData.prescriptions}`;

        const medicinesElement = document.createElement('p');
        medicinesElement.textContent = `Medicines: ${patientData.medicines}`;

        patientInfoContainer.appendChild(nameElement);
        patientInfoContainer.appendChild(genderElement);
        patientInfoContainer.appendChild(dobElement);
        patientInfoContainer.appendChild(emailElement);
        patientInfoContainer.appendChild(prescriptionsElement);
        patientInfoContainer.appendChild(medicinesElement);
    } else {
        patientInfoContainer.textContent = 'No patient data found.';
    }
}

// Function to handle edit button click
function handleEdit() {
    window.location.href = 'patient-info.html';
}

// Function to handle delete button click
function handleDelete() {
    localStorage.removeItem('patientData');
    window.location.href = 'patient-info.html';
}

// Function to handle back button click
function handleBack() {
    window.location.href = 'patient-info.html';
}

displayPatientInfo();
document.getElementById('editButton').addEventListener('click', handleEdit);
document.getElementById('deleteButton').addEventListener('click', handleDelete);
document.getElementById('backButton').addEventListener('click', handleBack);