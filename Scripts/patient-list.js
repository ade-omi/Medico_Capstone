function fetchPatientList() {
    fetch('/api/patients')
    .then(response => response.json())
    .then(patients => {
        var patientListContainer = document.getElementById('patientListContainer');
        patientListContainer.innerHTML = '';

        patients.forEach(function(patient) {
            var patientElement = document.createElement('div');
            patientElement.innerHTML = `Name: ${patient.name}, Condition: ${patient.condition}`;
            patientElement.className = 'patient-item';
            patientElement.onclick = function() {
                // Redirect to patient-info.html with the patient ID as a query parameter
                window.location.href = `patient-info.html?patientId=${patient.id}`;
            };
            patientListContainer.appendChild(patientElement);
        });
    })
    .catch(error => {
        console.error('Error fetching patient list:', error);
    });
}

fetchPatientList();