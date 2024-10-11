// Event listener for the appointment allocation form
document.getElementById('appointmentSlotForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime').value;
    const doctorID = localStorage.getItem('DoctorID');  // Assuming the doctor is already logged in and ID is stored

    if (!doctorID) {
        document.getElementById('allocationStatus').textContent = 'Error: Doctor not logged in';
        return;
    }

    // Prepare the data to send to the server
    const appointmentData = {
        doctorID: doctorID,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime
    };

    // Send the data to the server
    fetch('http://localhost:44368/api/Doctors/AllocateTime', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 409) {
                throw new Error('This appointment slot is already allocated');
            }
            throw new Error('Failed to allocate time');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('allocationStatus').textContent = 'Time allocated successfully';
        loadAppointments();  // Refresh the available slots after allocation
    })
    .catch(error => {
        document.getElementById('allocationStatus').textContent = 'Error: ' + error.message;
    });
});

// Function to delete an appointment slot
function deleteAppointment(slotID) {
    fetch(`http://localhost:44368/api/Doctors/Appointment/${slotID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete appointment');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('allocationStatus').textContent = 'Appointment deleted successfully';
        loadAppointments();  // Refresh the available slots after deletion
    })
    .catch(error => {
        document.getElementById('allocationStatus').textContent = 'Error: ' + error.message;
    });
}

// Load the current appointment slots from the server
function loadAppointments() {
    const doctorID = localStorage.getItem('DoctorID');  // Assuming the doctor is logged in

    if (!doctorID) {
        document.getElementById('appointmentsContainer').textContent = 'Error: Doctor not logged in';
        return;
    }

    // Fetch the current appointments
    fetch(`http://localhost:44368/api/Doctors/${doctorID}/Appointments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load appointments');
        }
        return response.json();
    })
    .then(data => {
        const appointmentsContainer = document.getElementById('appointmentsContainer');
        appointmentsContainer.innerHTML = '';  // Clear the current appointments list

        if (data.length === 0) {
            appointmentsContainer.textContent = 'No appointments allocated yet.';
            return;
        }

        data.forEach(appointment => {
            const appointmentElement = document.createElement('div');
            appointmentElement.innerHTML = `
                <p>${appointment.appointmentDate} at ${appointment.appointmentTime} - 
                ${appointment.isAvailable ? 'Available' : 'Booked by ' + appointment.patientUsername}</p>`;
            
            // Create a delete button for available appointments (not booked)
            if (appointment.isAvailable) {
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    deleteAppointment(appointment.slotID);
                });
                appointmentElement.appendChild(deleteButton);
            }

            appointmentsContainer.appendChild(appointmentElement);
        });
    })
    .catch(error => {
        document.getElementById('appointmentsContainer').textContent = 'Error: ' + error.message;
    });
}

// Initial load of appointment slots when the page is opened
document.addEventListener('DOMContentLoaded', loadAppointments);
