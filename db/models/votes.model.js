var sql = require('../db');

var Vote = function(vote) {
    this.bookid = vote.bookid;
    this.userid = vote.userid;
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

Vote.update = function(id, vote, result){
    sql.query("UPDATE bookranker.votes SET bookId=?,userId=?,stars=? WHERE id = ?", [vote.bookid, vote.userid, vote.stars, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {   
            result(null, res);
        }
    }); 
};

Vote.findAll = function (result) {
    sql.query("Select * from bookranker.votes", function (err, res) {
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