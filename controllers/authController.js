// for authentication functions

// import database
const db = require('../config/db');
const bcrypt = require('bcryptjs');
/// const express = require('express')
/// const router  = express.Router()

// Route for patient registration
exports.registerUser = function(req, res) {
    // Handle registration logic
};
exports.registerUser = async (req, res) => {
    const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;
    // Check if all required fields are present
    if (!first_name || !last_name || !email || !password || !phone || !date_of_birth || !gender || !address) {
        return res.status(400).json({ message: 'Please fill in all required fields.' });
    }
    try{
        // check if user exists in the database by use of email address
        const [rows] = await db.execute('SELECT * FROM patients WHERE email = ?', [email])
        if (rows.length > 0){
            return res.status(400).json({message: 'User already exists.'})
        }
    

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    //  Insert record into db 
    await db.execute ('INSERT INTO patients(first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',[
        first_name,
        last_name,
        email, 
        password_hash,
         phone, 
         date_of_birth,
          gender, 
          address


    ]);

    res.status(201).json({message: 'User registered successfully!'})
}catch(error){
    console.log(error)
    res.status(500).json({message: 'An error occurred.', error})
}
};
exports.loginUser = async (req, res) => {
    // Implement login logic here
};





// Route for patient login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
// check if patient exists
    const [rows] =await db.execute( 'SELECT * FROM User WHERE email = ?',[email]);
    
        if (rows.length === 0){
             return res.status(404).json({message:'User not found.'});
        }

        const user = [rows];

        // Compare hashed password
        const passwordMatch  = await bcrypt.compare(password, user.password);
        if (!passwordMatch){
             return res.status(400).json({message:'Invalid credentials'});
        }

        // Create session
        req.session.user = {userId:user.Id, name:user.username,email:user.email};
        res.status(200).json('Login successful')
    };






  // manage patient profile
exports.manageUser = async (req, res) => {
    const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;
    const userId = req.params.id; // Assuming patient id is passed via URL parameters

    try {
        // Check if patient exists by ID
        const [rows] = await db.execute('SELECT * FROM User WHERE user_id = ?', [userId]);

        if (rows.length === 0) {
            // If no patient found, return 404 Not Found
            return res.status(404).json({ message: 'User not found' });
        }

        // Update patient details
        let updateQuery = 'UPDATE User SET first_name = ?, last_name = ?, email = ?, phone = ?, date_of_birth = ?, gender = ?, address = ?';
        const queryParams = [first_name, last_name, email, phone, date_of_birth, gender, address];

        // Hash the password if provided, then update it
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateQuery += ', password = ?';  // Append password to update query
            queryParams.push(hashedPassword); // Add hashed password to the parameters array
        }

        updateQuery += ' WHERE User_id = ?';
        queryParams.push(userId); // Append patient ID for WHERE clause

        // Execute the update query
        await db.execute(updateQuery, queryParams);

        res.status(200).json({ message: 'Patient details updated successfully' });
    } catch (error) {
        console.error('Error updating patient details:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// // Doctor and Appointment Management
// //For the admin to manage doctors, create routes for CRUD operations
// // Route for admin to add a doctor
router.post('/admin/doctors', (req, res) => {
    const { first_name, last_name, specialization, email, phone, schedule } = req.body;

    const sql = 'INSERT INTO Doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [first_name, last_name, specialization, email, phone, schedule], (err, result) => {
        if (err) throw err;
        res.send('Doctor added successfully');
    });
});

// // // patient appointment booking
// // //Book an Appointment (Patient)
// // // Route for patients to book an appointment
router.post('/appointments', (req, res) => {
    const { doctor_id, appointment_date, appointment_time } = req.body;

    if (!req.session.patientId) return res.status(401).send('Not authenticated');

    const sql = 'INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, "scheduled")';
    db.query(sql, [req.session.patientId, doctor_id, appointment_date, appointment_time], (err, result) => {
        if (err) throw err;
        res.send('Appointment booked successfully');
    });
});

// module.exports = router;
