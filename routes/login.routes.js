const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login.controller');
const auth = require('../middleware/auth.middleware');

// Create a new login
router.post('/new', loginController.create);

// Authenticate User
router.post('/', loginController.validateUser);

// Get all users and ids
router.get('/users', loginController.findAllUsers);

// Delete a user
router.delete('/', auth.authenticateToken, loginController.delete);

module.exports = router