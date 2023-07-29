const express = require('express')
const router = express.Router()
const votesController = require('../controllers/votes.controller');

// Retrieve all votes
router.get('/', votesController.findAll);

// Create a new vote
router.post('/', votesController.create);

// Update a vote with id
router.put('/:id', votesController.update);

// Retrieve all votes for a book
router.get('/book/:id', votesController.findAllForBook);

// Retrieve all votes for a user
router.get('/user/:id', votesController.findAllForUser);


module.exports = router