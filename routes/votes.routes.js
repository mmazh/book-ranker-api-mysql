const express = require('express')
const router = express.Router()
const votesController = require('../controllers/votes.controller');

// Retrieve all votes
router.get('/', votesController.findAll);

// Create a new vote
router.post('/', votesController.create);

// Update a vote with id
router.put('/:id', votesController.update);

module.exports = router