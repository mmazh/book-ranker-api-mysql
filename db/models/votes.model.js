var sql = require('../db');

var Vote = function(vote) {
    this.bookId = vote.bookId;
    this.userId = vote.userId;
    this.stars = vote.stars;
};

Vote.create = function (newVote, result) {    
    sql.query("INSERT INTO bookranker.votes SET ?", newVote, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });           
};

Vote.update = function(id, vote, result) {
    let query = `UPDATE bookranker.votes
                SET bookId=?, userId=?, stars=?
                WHERE voteId=?`
    sql.query(query, [vote.bookId, vote.userId, vote.stars, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Vote.findAll = function (result) {
    let query = `SELECT votes.userId, votes.stars, votes.voteId, votes.bookId
                FROM votes`
    sql.query(query, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });   
};

Vote.findAllForBook = function (id, result) {
    let query = `Select login.username, votes.stars 
                FROM votes
                INNER JOIN login ON login.userId=votes.userId
                WHERE votes.bookId=?`
    sql.query(query, [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });   
};

Vote.findAllForUser = function (id, result) {
    let query = `Select votes.userId, votes.bookId, login.username, votes.stars 
                FROM votes
                INNER JOIN login ON login.userId=votes.userId
                WHERE votes.userId=?;`
    sql.query(query, [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });   
};

module.exports = Vote;