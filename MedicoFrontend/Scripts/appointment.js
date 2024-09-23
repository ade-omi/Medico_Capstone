document.addEventListener('DOMContentLoaded', function () {
    const patientID = localStorage.getItem('PatientID'); // Assume patient is logged in

    // Fetch available appointments
    function loadAvailableAppointments() {
        fetch('http://localhost:44368/api/Appointments/Available', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            const availableAppointmentsContainer = document.getElementById('availableAppointmentsContainer');
            availableAppointmentsContainer.innerHTML = '';

            if (data.length === 0) {
                availableAppointmentsContainer.textContent = 'No available appointments.';
                return;
            }

            data.forEach(appointment => {
                const appointmentElement = document.createElement('div');
                appointmentElement.innerHTML = `
                    <p>Appointment Date: ${appointment.appointmentDate}</p>
                    <p>Time: ${appointment.appointmentTime}</p>
                    <button data-appointment-id="${appointment.slotID}">Book Appointment</button>
                `;
                availableAppointmentsContainer.appendChild(appointmentElement);

                // Add event listener to book the appointment
                appointmentElement.querySelector('button').addEventListener('click', () => {
                    bookAppointment(appointment.slotID);
                });
            });
        })
        .catch(error => {
            console.error('Error loading available appointments:', error);
        });
    }

    // Book an appointment
    function bookAppointment(appointmentID) {
        fetch('http://localhost:44368/api/Appointments/Book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ appointmentID, patientID })
        })
        .then(response => response.json())
        .then(data => {
            alert('Appointment booked successfully');
            loadAvailableAppointments();  // Reload available appointments
        })
        .catch(error => {
            alert('Error booking appointment: ' + error.message);
        });
    }

    // Initial load of available appointments
    loadAvailableAppointments();
});
