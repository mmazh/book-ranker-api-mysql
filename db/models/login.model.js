var sql = require('../db');

var Login = function(login) {
    this.username = login.username;
    this.password = login.password;
};

Login.create = function (newLogin, result) {    
    sql.query("INSERT INTO bookranker.login SET ?", newLogin, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};

module.exports = Login;