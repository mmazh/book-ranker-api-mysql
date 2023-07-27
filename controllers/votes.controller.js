const Votes = require('../db/models/votes.model');

exports.findAll = function(req, res) {
  Votes.findAll(function(err, vote) {
    if (err) res.send(err);
    res.send(vote);
  });
};

exports.create = function(req, res) {
    const newVote = new Votes(req.body);
    Votes.create(newVote, function(err, vote) {
        if (err) res.send(err);
        res.json({ error:false, data:vote });
    });
};

exports.update = function(req, res) {
    Votes.update(req.params.id, new Votes(req.body), function(err, vote) {
        if (err) res.send(err);
        res.json({ error:false, data:vote });
    });
};
