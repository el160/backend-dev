const express = require('express');
const { registerUser,loginUser } = require('../controllers/authController');
const router = express.Router();

//configure routes

// user registration 
router.post('/register',registerUser)

//user login
router.post('/login',loginUser)

//user logout
/// router.get('/logout',logoutUser)

/// module.exports = (authController) => {
//   router.post('/register', authController.registerUser);
//   router.post('/login', authController.loginUser);

//   return router;
/// };


module.exports = router;



