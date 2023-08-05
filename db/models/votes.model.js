var sql = require('../db');

var Vote = function(vote) {
    this.bookId = vote.bookId;
    this.userId = vote.userId;
    this.stars = vote.stars;
};

Vote.create = function (newVote, result) {    
    sql.query("INSERT INTO bookranker.votes SET ?", newVote, function (err, res) {
        if (err) return result(err, null);
        result(null, res.insertId);
    });           
};

Vote.update = function(id, vote, result) {
    let query = `UPDATE bookranker.votes
                SET stars=?
                WHERE voteId=?`
    let getUser = `SELECT votes.userId
                    FROM votes
                    WHERE voteId=?`
    sql.query(getUser, id, function (err, user) {
        if (err) return result(null, err);
        if (user.length == 0) return result(400, null);
        if (user[0].userId !== vote.userId) return result(403, null);

        sql.query(query, [vote.stars, id], function (err, res) {
            if (err) return result(null, err);
            result(200, null);
        });
    });
};

Vote.findAll = function (result) {
    let query = `SELECT votes.userId, votes.stars, votes.voteId, votes.bookId
                FROM votes`
    sql.query(query, function (err, res) {
        if (err) return result(null, err);
        result(null, res);
    });   
};

Vote.findAllForBook = function (id, result) {
    let query = `Select login.username, votes.stars 
                FROM votes
                INNER JOIN login ON login.userId=votes.userId
                WHERE votes.bookId=?`
    sql.query(query, [id], function (err, res) {
        if (err) return result(null, err);
        result(null, res);
    });   
};

Vote.findAllForUser = function (id, result) {
    let query = `Select votes.userId, votes.bookId, login.username, votes.stars 
                FROM votes
                INNER JOIN login ON login.userId=votes.userId
                WHERE votes.userId=?;`
    sql.query(query, [id], function (err, res) {
        if (err) return result(null, err);
        result(null, res);
    });   
};

Vote.delete = function (voteId, userId, result) {
    let query = `DELETE FROM votes
                WHERE votes.voteId=?`
    let getUser = `SELECT votes.userId
                    FROM votes
                    WHERE voteId=?`
    sql.query(getUser, voteId, function (err, user) {
        if (err) return result(null, err);
        if (user.length == 0) return result(400, null);
        if (user[0].userId !== userId) return result(403, null);

        sql.query(query, voteId, function (err, res) {
            if (err) return result(null, err);
            result(200, null);
        });
    })
};

module.exports = Vote;