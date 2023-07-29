const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login.controller');

// Create a new login
router.post('/', loginController.create);

// Get all users and ids
router.get('/users', loginController.findAllUsers);

module.exports = router