const Votes = require('../db/models/votes.model');

exports.findAll = function(req, res) {
  Votes.findAll(function(err, vote) {
    if (err) return res.send(err);
    res.send(vote);
  });
};

exports.findAllForBook = function(req, res) {
  Votes.findAllForBook(req.params.id, function(err, vote) {
    if (err) return res.send(err);
    res.send(vote);
  });
};

exports.findAllForUser = function(req, res) {
  Votes.findAllForUser(req.params.id, function(err, vote) {
    if (err) return res.send(err);
    res.send(vote);
  });
};

exports.create = function(req, res) {
    req.body.userId = req.userId;
    const newVote = new Votes(req.body);
    Votes.create(newVote, function(err, vote) {
        if (err) return res.send(err);
        res.json({ error:false, data:vote });
    });
};

exports.update = function(req, res) {
  req.body.bookId = null;
  req.body.userId = req.userId;
  Votes.update(req.params.id, new Votes(req.body), function(err, vote) {
    if (err) return res.send(err);
    res.json({ error:false, data:vote });
  });
};

exports.delete = function(req, res) {
  Votes.delete(req.params.voteId, req.userId, function(err, val) {
    if (err) return res.send(err);
    res.json({ error:false, data: val });
  });
};
