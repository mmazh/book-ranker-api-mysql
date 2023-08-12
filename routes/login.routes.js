const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login.controller');
const auth = require('../middleware/auth.middleware');

// Create a new login
router.post('/new', loginController.create);

// Get all users and ids
router.get('/users', loginController.findAllUsers);

module.exports = router