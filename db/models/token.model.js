var sql = require('../db');
var bcrypt = require('bcrypt');
const saltRounds = 12;

var Token = function(token) {
    this.refreshToken = token.refreshToken;
};

Token.refreshTokenExists = function (token, userId, result) {
    let query = `SELECT tokens.tokenHash
                FROM tokens
                WHERE tokens.userId=?`
    sql.query(query, userId, function (err, res) {
        if (err) return result(500, null);
        if (res.length === 0) return result(401, null);
        bcrypt.compare(token, res[0].tokenHash).then(
            val => result(null, val),
            err => result(500, null));
    });
};


Token.add = function (token, userId, result) {      
    let query = `INSERT INTO tokens (tokenHash, userId)
                VALUES (?, ?)`
    bcrypt.hash(token, saltRounds).then(hash => {
        sql.query(query, [hash, userId], function (err, res) {
            if (err) return result(500, null);
            result(null, res);
        });
    },
    err => result(500, null));
};


Token.delete = function (userId, result) {
    let query = `DELETE FROM tokens
                WHERE tokens.userId=?`
    sql.query(query, userId, function (err, res) {
        if (err) return result(500, null);
        result(null, res);
    });
};

module.exports = Token;