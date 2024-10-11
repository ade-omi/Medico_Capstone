document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentTableBody = document.querySelector('#appointmentTable tbody');

    // Load session data when the page loads
    loadSessionData();
  

    // LOAD PATIENTS APPOINTMENTS FROM THE API
    // Function to load session data
    function loadSessionData() {
        appointmentTableBody.innerHTML = '';
        
        sessionStorage.setItem('appointments' ,JSON.stringify([]))

        // hit api endpoint to load patient existing appointments
        fetch(`https://localhost:44368/api/Patients/Dashboard?patientID=${localStorage.getItem('PatientID')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})
            .then(response => response.json())
            .then(dashBinfo => {
                let sessAppointmentStorage = JSON.parse(sessionStorage.getItem('appointments'));
                dashBinfo['appointments'].forEach(elements => {
                    sessAppointmentStorage.push({
                        'index': [elements['appointmentId']],
                        'date': elements['appmntDate'],
                        'time': elements['appmntTime'],
                        'doctor': elements['doctorFullName'],
                        'reason': elements['reason']
                    })
                })
                sessionStorage.setItem('appointments', JSON.stringify(sessAppointmentStorage));

                 // Retrieve data from session storage
                const appointments = JSON.parse(sessionStorage.getItem('appointments'));
                
                if (appointments) {
                    // Iterate over each appointment and create table rows
                    appointments.forEach(function(appointment, index) {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                                <td>${appointment.date}</td>
                                <td>${appointment.time}</td>
                                <td>${appointment.doctor}</td>
                                <td>${appointment.reason}</td>
                                <td><button class="delete-btn" data-index="${index}">Cancel</button></td>`;
                        appointmentTableBody.appendChild(row);
                    });
                
                    // Add event listeners for delete 
                    appointmentTableBody.querySelectorAll('.delete-btn').forEach(function(btn) {
                        btn.addEventListener('click', function() {
                            const index = btn.getAttribute('data-index');
                            deleteAppointment(index);
                        });
                    });
                }
            });
    }

    //QUERY API TO DELETE AN APPOINTMENT
    // Function to delete appointment
    function deleteAppointment(index) {
        //let appointments = JSON.parse(sessionStorage.getItem('appointments')) || [];
        //appointments.splice(index, 1);
        //sessionStorage.setItem('appointments', JSON.stringify(appointments));

        fetch(`https://localhost:44368/api/Appointments/${index}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(response => response.json()) 
        .then(() => {
            alert("Successfully deleted")
            loadSessionData();
        })
        .catch(error => {
            alert(error.message);
        });
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
