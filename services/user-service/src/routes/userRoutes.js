// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/users', userController.createUser);

// Get a user by ID
router.get('/users/:id', userController.getUser);

module.exports = router;
