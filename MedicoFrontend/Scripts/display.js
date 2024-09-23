const patientId = getPatientId(); // You need to implement getPatientId to retrieve the actual patient ID

// Function to fetch and display patient information and prescriptions
function fetchAndDisplayPatientInfo() {
    fetch(`/api/patients/${patientId}`)
    .then(response => response.json())
    .then(data => {
        // Display patient information
        const patientInfoContainer = document.getElementById('patientInfo');
        patientInfoContainer.innerHTML = `
            <p>Name: ${data.name}</p>
            <p>Gender: ${data.gender}</p>
            <p>Date of Birth: ${data.dob}</p>
            <p>Email: ${data.email}</p>
        `;

        // Display prescriptions
        const prescriptionsContainer = document.getElementById('prescriptionsContainer');
        prescriptionsContainer.innerHTML = data.prescriptions.map(prescription => `
            <div class="prescription">
                <p>Drug Name: ${prescription.drugName}</p>
                <p>Dosage: ${prescription.dosageInstruction}</p>
                <p>Issue Date: ${prescription.issueDate}</p>
                <p>End Date: ${prescription.endDate}</p>
                <button onclick="editPrescription(${prescription.id})">Edit</button>
                <button onclick="deletePrescription(${prescription.id})">Delete</button>
            </div>
        `).join('');
    })
    .catch(error => {
        console.error('Error fetching patient information:', error);
    });
}

// Function to edit a prescription
function editPrescription(prescriptionId) {
    // Fetch the prescription data from the server
    fetch(`/api/prescriptions/${prescriptionId}`)
    .then(response => response.json())
    .then(prescriptionData => {
        // Populate the form with the prescription data
        document.getElementById('prescriptionForm').classList.remove('hidden');
        document.getElementById('drugName').value = prescriptionData.drugName;
        document.getElementById('dosageInstruction').value = prescriptionData.dosageInstruction;
        document.getElementById('issueDate').value = prescriptionData.issueDate;
        document.getElementById('endDate').value = prescriptionData.endDate;
        // Store the prescriptionId in a hidden field or in a global variable for later use
    })
    .catch(error => {
        console.error('Error fetching prescription data:', error);
    });
}
function deletePrescription(prescriptionId) {
    // Send a DELETE request to the server to delete the prescription
    fetch(`/api/prescriptions/${prescriptionId}`, { method: 'DELETE' })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        alert('Prescription successfully deleted.');
        // Update the UI to remove the deleted prescription
        // You might need to re-fetch the prescription list or remove the element from the DOM
        fetchAndDisplayPatientInfo(); // Re-fetch patient and prescription info
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting the prescription.');
    });
}

// Function to handle form submission for updating a prescription
document.getElementById('prescriptionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Assuming you have a variable to store the current prescription ID being edited
    let currentPrescriptionId = getCurrentPrescriptionId(); // Implement this function based on your application logic

    const updatedPrescriptionData = {
        drugName: document.getElementById('drugName').value,
        dosageInstruction: document.getElementById('dosageInstruction').value,
        issueDate: document.getElementById('issueDate').value,
        endDate: document.getElementById('endDate').value
    };

    // Send a PUT request to the server to update the prescription
    fetch(`/api/prescriptions/${currentPrescriptionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPrescriptionData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        alert('Prescription successfully updated.');
        // Hide the form after successful update
        document.getElementById('prescriptionForm').classList.add('hidden');
        // Update the UI to reflect the updated prescription
        fetchAndDisplayPatientInfo(); // Re-fetch patient and prescription info
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the prescription.');
    });
});

// Fetch patient info and prescriptions when the DOM is ready
document.addEventListener('DOMContentLoaded', fetchAndDisplayPatientInfo);