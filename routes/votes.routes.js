const express = require('express')
const router = express.Router()
const votesController = require('../controllers/votes.controller');

// Retrieve all votes
router.get('/', votesController.findAll);

// Retrieve all votes for a book
router.get('/book/:id', votesController.findAllForBook);

// Retrieve all votes for a user
router.get('/user/:id', votesController.findAllForUser);

// Create a new vote
router.post('/', votesController.create);

// Update a vote with id
router.put('/:id', votesController.update);

module.exports = router