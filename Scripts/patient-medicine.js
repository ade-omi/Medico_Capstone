// Function to handle the submission of the medicines form
function updateMedicines(event) {
    event.preventDefault();

    const patientName = document.getElementById('patientName').value;
    const medicines = document.getElementById('medicines').value;

    // Assuming we have a function to update the patient's medicines in the database or local storage
    // updatePatientMedicines(patientName, medicines);

    // For demonstration purposes, let's just log the updated medicines
    console.log(`Updated medicines for ${patientName}: ${medicines}`);

    // Redirect to the Doctor Dashboard or show a success message
    alert("Medicines updated successfully!");
    window.location.href = '../doctor-dashboard.html';
}

// Add event listener to the medicines form
document.getElementById('medicinesForm').addEventListener('submit', updateMedicines);