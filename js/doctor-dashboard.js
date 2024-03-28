// Function to fetch and display patient information
function fetchPatientInfo() {
    // Example: Fetch patient information from the server or local storage
    // This is just a placeholder, you'll need to implement the actual data fetching
    var patients = [
        { name: "John Doe", age: 30, condition: "Flu" },
        { name: "Jane Smith", age: 25, condition: "Allergy" }
    ];

    var patientInfoContainer = document.getElementById('patientInfoContainer');
    patientInfoContainer.innerHTML = '';

    patients.forEach(function(patient) {
        var patientElement = document.createElement('div');
        patientElement.innerHTML = `Name: ${patient.name}, Age: ${patient.age}, Condition: ${patient.condition}`;
        patientInfoContainer.appendChild(patientElement);
    });
}

// Function to fetch and display appointments
function fetchAppointments() {
    // Example: Fetch appointments from the server or local storage
    // This is just a placeholder, you'll need to implement the actual data fetching
    var appointments = [
        { date: "2024-03-15", time: "10:00", patient: "John Doe" },
        { date: "2024-03-16", time: "14:00", patient: "Jane Smith" }
    ];

    var appointmentsContainer = document.getElementById('appointmentsContainer');
    appointmentsContainer.innerHTML = '';

    appointments.forEach(function(appointment) {
        var appointmentElement = document.createElement('div');
        appointmentElement.innerHTML = `Date: ${appointment.date}, Time: ${appointment.time}, Patient: ${appointment.patient}`;
        appointmentsContainer.appendChild(appointmentElement);
    });
}

// Call these functions when the page loads
window.onload = function() {
    fetchPatientInfo();
    fetchAppointments();
};