const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book.controller');

// Retrieve all books
router.get('/', bookController.findAll);

// Retrieve top three books
router.get('/top3', bookController.findTopThree);

// Create a new book
router.post('/', bookController.create);

module.exports = router