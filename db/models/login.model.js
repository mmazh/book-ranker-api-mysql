var sql = require('../db');
var bcrypt = require('bcrypt');
const saltRounds = 12;

var Login = function(login) {
    this.username = login.username;
    this.password = login.password;
};

Login.validateUser = function (loginInfo, result) {
    let query = `SELECT hashedpass
                FROM login
                WHERE login.username=?`
    sql.query(query, [loginInfo.username], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, false);
        } else if (res.length === 0) {
            result(null, false);
        } else {
            var hash = res[0].hashedpass;
            bcrypt.compare(loginInfo.password, hash).then(
                res => result(null, res),
                err => result(null, err));
        }
    });
};

Login.create = function (newLogin, result) {
    bcrypt.hash(newLogin.password, saltRounds).then(hash => {
        let hashedLogin = { username: newLogin.username, hashedpass: hash }
        sql.query("INSERT INTO bookranker.login SET ?", hashedLogin, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res.insertId);
            }
        });
    },
    err => console.error(err.message));
};

Login.findAllUsers = function (result) {
    let query = `SELECT userId, username
                FROM login`
    sql.query(query, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Login;