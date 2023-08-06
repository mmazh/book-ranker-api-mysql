var sql = require('../db');
var bcrypt = require('bcrypt');
const saltRounds = 12;

var Login = function(login) {
    this.username = login.username;
    this.password = login.password;
};

Login.validateUser = function (loginInfo, result) {
    let query = `SELECT hashedpass, userId
                FROM login
                WHERE login.username=?`
    sql.query(query, [loginInfo.username], function (err, res) {
        if (err) return result(500);
        if (res.length === 0) return result(401);

        bcrypt.compare(loginInfo.password, res[0].hashedpass).then(val => {
            if (!val) return result(401);
            result(null, { userId: res[0].userId })},
            err => result(500));
        }
    );
};

Login.create = function (newLogin, result) {
    bcrypt.hash(newLogin.password, saltRounds).then(hash => {
        let data = { username: newLogin.username, hashedpass: hash }

        sql.query("INSERT INTO bookranker.login SET ?", data, function (err, res) {
            if (err) return result(err, null);
            result(200) })},
            
        err => console.error(err.message)
    );
};

Login.findAllUsers = function (result) {
    let query = `SELECT userId, username
                FROM login`
    sql.query(query, function (err, res) {
        if (err) return result(null, err);
        result(null, res);
    });
};

Login.delete = function (userId, result) {
    let query = `DELETE FROM login 
                WHERE login.userId=?`
    sql.query(query, userId, function (err, res) {
        if (err) return result(null, err);
        result(200);
    });
};

module.exports = Login;