require('dotenv').config();
const Login = require('../db/models/login.model');
const jwt = require('jsonwebtoken');


exports.create = function(req, res) {
    const newLogin = new Login(req.body);
    Login.create(newLogin, function(err, login) {
        if (err) res.send(err);
        res.json({ error:false, data:login });
    });
};

exports.findAllUsers = function(req, res) {
    Login.findAllUsers(function(err, user) {
        if (err) return res.send(err);
        res.send(user);
    });
};

exports.validateUser = function(req, res, next) {
    const login = new Login(req.body);
    Login.validateUser(login, function(err, user) {
        if (err) return res.sendStatus(err);
        req.userId = user.userId;
        res.status(200);
        next();
    });
};

exports.delete = function(req, res) {
    Login.delete(req.userId, function(err, val) {
        if (err) return res.sendStatus(401);
        res.sendStatus(200);
    });
};
