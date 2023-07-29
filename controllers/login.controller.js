const Login = require('../db/models/login.model');

exports.create = function(req, res) {
    const newLogin = new Login(req.body);
    Login.create(newLogin, function(err, login) {
        if (err) res.send(err);
        res.json({ error:false, data:login });
    });
};

exports.findAllUsers = function(req, res) {
    Login.findAllUsers(function(err, user) {
        if (err) res.send(err);
        res.send(user);
    });
};