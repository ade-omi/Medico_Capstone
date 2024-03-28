// Function to display patient information
function displayPatientInfo() {
    // Example: Fetch patient information from the server or local storage
    const patientData = {
        name: "John Doe",
        age: 30,
        condition: "Flu",
        medicines: ["Medicine 1", "Medicine 2", "Medicine 3"]
    };

    const patientInfoContainer = document.getElementById('patientInfo');
    patientInfoContainer.innerHTML = `
        <p>Name: ${patientData.name}</p>
        <p>Age: ${patientData.age}</p>
        <p>Condition: ${patientData.condition}</p>
    `;

    const patientMedicinesContainer = document.getElementById('patientMedicines');
    patientMedicinesContainer.innerHTML += patientData.medicines.map(medicine => `<p>${medicine}</p>`).join('');
}

document.addEventListener('DOMContentLoaded', displayPatientInfo);