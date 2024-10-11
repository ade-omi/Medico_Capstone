const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors

const app = express();

app.use(cors());  // Enable cross-origin requests
app.use(bodyParser.json());  // Parse JSON data from requests

// Create MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'medico_db'
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL Database');
});

// === Doctor login route ===
app.post('/api/Doctors/Login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const query = 'SELECT doctorID FROM doctors WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            res.json({ doctorID: results[0].doctorID });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// === Patient signup route ===
app.post('/api/signup-patient', (req, res) => {
    const {
        username, firstName, lastName, email, phoneNumber,
        dateOfBirth, gender, healthCardNumber, password
    } = req.body;

    const query = `INSERT INTO patients (username, firstName, lastName, email, phoneNumber, 
        dateOfBirth, gender, healthCardNumber, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [username, firstName, lastName, email, phoneNumber,
        dateOfBirth, gender, healthCardNumber, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error saving patient data' });
        }
        res.status(201).json({ message: 'Patient signed up successfully' });
    });
});

//===Patient Login===
app.post('/api/Patients/Login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const query = 'SELECT patientID FROM patients WHERE username = ? AND password = ?';
    
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
            res.json({ patientID: results[0].patientID });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// === Doctor allocating appointment ===

app.post('/api/Doctors/AllocateTime', (req, res) => {
    const { doctorID, appointmentDate, appointmentTime } = req.body;

    if (!doctorID || !appointmentDate || !appointmentTime) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the appointment slot already exists
    const checkQuery = `SELECT * FROM appointment_slots WHERE doctorID = ? AND appointmentDate = ? AND appointmentTime = ?`;

    db.query(checkQuery, [doctorID, appointmentDate, appointmentTime], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error checking for duplicate appointment:', checkErr);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (checkResults.length > 0) {
            return res.status(409).json({ message: 'This appointment slot is already allocated' });
        }

        // If no duplicate found, insert the new appointment slot
        const insertQuery = `INSERT INTO appointment_slots (doctorID, appointmentDate, appointmentTime, isAvailable) 
                             VALUES (?, ?, ?, true)`;

        db.query(insertQuery, [doctorID, appointmentDate, appointmentTime], (insertErr, insertResult) => {
            if (insertErr) {
                console.error('Error allocating time slot:', insertErr);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(201).json({ message: 'Time slot allocated successfully' });
        });
    });
});

//===== deleting allocated appointments
// Route to delete an appointment slot
app.delete('/api/Doctors/Appointment/:slotID', (req, res) => {
    const { slotID } = req.params;

    const query = `DELETE FROM appointment_slots WHERE slotID = ?`;

    db.query(query, [slotID], (err, result) => {
        if (err) {
            console.error('Error deleting appointment slot:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully' });
    });
});

// === Fetch all allocated appointments for a specific doctor ===
app.get('/api/Doctors/:doctorID/Appointments', (req, res) => {
    const { doctorID } = req.params;

    const query = `SELECT * FROM appointment_slots WHERE doctorID = ?`;

    db.query(query, [doctorID], (err, results) => {
        if (err) {
            console.error('Error fetching appointments:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No appointments found' });
        }

        res.status(200).json(results);
    });
});

// Fetch available appointments (appointments that are not booked)
app.get('/api/Appointments/Available', (req, res) => {
    const query = `SELECT * FROM appointment_slots WHERE isAvailable = true`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching available appointments:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(200).json(results);
    });
});

// Book an appointment
app.post('/api/Appointments/Book', (req, res) => {
    const { appointmentID, patientID } = req.body;

    if (!appointmentID || !patientID) {
        return res.status(400).json({ message: 'Appointment ID and Patient ID are required' });
    }

    // Update the appointment to mark it as booked
    const query = `UPDATE appointment_slots SET isAvailable = false, patientID = ? WHERE slotID = ?`;

    db.query(query, [patientID, appointmentID], (err, result) => {
        if (err) {
            console.error('Error booking appointment:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found or already booked' });
        }

        res.status(200).json({ message: 'Appointment booked successfully' });
    });
});

// Fetch booked appointments for a specific doctor
app.get('/api/Doctors/:doctorID/Appointments', (req, res) => {
    const { doctorID } = req.params;

    const query = `SELECT a.*, p.username AS patientUsername FROM appointment_slots a
                   LEFT JOIN patients p ON a.patientID = p.patientID
                   WHERE a.doctorID = ? AND a.isAvailable = false`;

    db.query(query, [doctorID], (err, results) => {
        if (err) {
            console.error('Error fetching booked appointments:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(200).json(results);
    });
});




// Start the server
const PORT = process.env.PORT || 44368;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
