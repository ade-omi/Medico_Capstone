document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentTableBody = document.querySelector('#appointmentTable tbody');

    // Load session data when the page loads
    loadSessionData();

    // Handle form submission
    appointmentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form values
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const doctor = document.getElementById('Doctor').value;
        const reason = document.getElementById('reason').value;

        // Validate form inputs
        if (!validateInputs(date, time, reason)) {
            return; // Validation failed, do not proceed
        }

        // Save data to session storage
        saveSessionData(date, time, doctor, reason);

        // Clear form fields
        appointmentForm.reset();

        // Reload session data
        loadSessionData();
    });

    // Function to save session data
    function saveSessionData(date, time, doctor, reason) {
        // Retrieve existing data or initialize empty array
        let appointments = JSON.parse(sessionStorage.getItem('appointments')) || [];

        // Add new appointment to the array
        appointments.push({ date, time, doctor, reason });

        // Save updated array to session storage
        sessionStorage.setItem('appointments', JSON.stringify(appointments));
    }

    // Function to load session data
    function loadSessionData() {
        appointmentTableBody.innerHTML = '';

        // Retrieve data from session storage
        const appointments = JSON.parse(sessionStorage.getItem('appointments'));

        if (appointments) {
            // Iterate over each appointment and create table rows
            appointments.forEach(function(appointment, index) {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${appointment.date}</td><td>${appointment.time}</td><td>${appointment.doctor}</td><td>${appointment.reason}</td><td><button class="delete-btn" data-index="${index}">Delete</button></td><td><button class="edit-btn" data-index="${index}">Edit</button></td>`;
                appointmentTableBody.appendChild(row);
            });

            // Add event listeners for delete and edit buttons
            appointmentTableBody.querySelectorAll('.delete-btn').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    const index = btn.getAttribute('data-index');
                    deleteAppointment(index);
                });
            });

            appointmentTableBody.querySelectorAll('.edit-btn').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    const index = btn.getAttribute('data-index');
                    editAppointment(index);
                });
            });
        }
    }

    // Function to delete appointment
    function deleteAppointment(index) {
        let appointments = JSON.parse(sessionStorage.getItem('appointments')) || [];
        appointments.splice(index, 1);
        sessionStorage.setItem('appointments', JSON.stringify(appointments));
        loadSessionData();
    }

    // Function to edit appointment
    function editAppointment(index) {
        let appointments = JSON.parse(sessionStorage.getItem('appointments')) || [];
        const appointment = appointments[index];
        if (appointment) {
            // Populate form with appointment details
            document.getElementById('date').value = appointment.date;
            document.getElementById('time').value = appointment.time;
            document.getElementById('Doctor').value = appointment.doctor;
            document.getElementById('reason').value = appointment.reason;
        }
    }

    // Function to validate form inputs
    function validateInputs(date, time, reason) {
        const currentDate = new Date().toISOString().split('T')[0];
        if (date < currentDate) {
            alert('Please select a future date.');
            return false;
        }
        if (!time.match(/^([01]\d|2[0-3]):([0-5]\d)$/)) {
            alert('Please enter a valid time in HH:mm format.');
            return false;
        }
        if (!reason.trim()) {
            alert('Please enter a reason for the appointment.');
            return false;
        }
        return true;
    }
});
