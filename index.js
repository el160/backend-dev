//import packages
const express = require('express');
const session = require('express-session');
const MySQLStore = require('connect-mysql2')(session);
const path = require('path');// rendering the htmlform
require('dotenv').config();
 const db = require('./config/db');
const authRoutes = require('./routes/auth');




// Initialize express sever
const app = express();

// set up port
const PORT = process.env.PORT || 5500;

// Import routes and middleware
// const authRoutes = require('./routes/auth');
// const patientRoutes = require('./routes/patients');
// const doctorRoutes = require('./routes/doctors');
// const appointmentRoutes = require('./routes/appointments');


// Middleware setup
app.use(express.static(path.join(__dirname,'/')));
app.use(express.json());// convert json to javascript objects
// app.use(express.urlencoded({ extended: true }));// pass requests when form data come in url form


// app.use('/auth', authRoutes);
// app.use('/patients', patientRoutes);
// app.use('/doctors', doctorRoutes);
// app.use('/appointments', appointmentRoutes);


// Setup session management
app.use(session({
    key: 'user_sid',
    secret: process.env.SESSION_SECRET,//'KeyboardEvent',
    resave: false,
    saveUninitialized: false,
    // store:new MySQLStore( {},db)
}));

//routes
//serve html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'java.html'))
})
// authentication routes
app.use('/auth', authRoutes)

// Serve static files from the "public" directory
app.use(express.static('public'));

//start server
const port = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${port}`);
  })
//   .on('error', (err) => {
//     console.error('Error starting server:', err);
// });

// // Handle uncaught exceptions and unhandled promise rejections
// process.on('uncaughtException', (err) => {
//     console.error('Uncaught exception:', err);
//     process.exit(1);
// });

// process.on('unhandledRejection', (reason, promise) => {
//     console.error('Unhandled rejection:', reason, promise);
//     process.exit(1);
// });







