const express = require('express')
const router = express.Router()
const votesController = require('../controllers/votes.controller');
const auth = require('../middleware/auth.middleware');

// Retrieve all votes
router.get('/', votesController.findAll);

// Create a new vote
router.post('/', auth.authenticateAccessToken, votesController.create);

// Update a vote with id
router.put('/:id', auth.authenticateAccessToken, votesController.update);

// Retrieve all votes for a book
router.get('/book/:id', votesController.findAllForBook);

// Retrieve all votes for a user
router.get('/user/:id', votesController.findAllForUser);

// Delete a vote
router.delete('/:voteId', auth.authenticateAccessToken, votesController.delete);

module.exports = router