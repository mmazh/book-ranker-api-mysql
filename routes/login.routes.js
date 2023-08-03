const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login.controller');

// Create a new login
router.post('/new', loginController.create);

// Check login
router.post('/', loginController.validateUser);

// Get all users and ids
router.get('/users', loginController.findAllUsers);

module.exports = router