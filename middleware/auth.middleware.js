const jwt = require('jsonwebtoken');
require('dotenv').config();
const Token = require('../db/models/token.model');
const Login = require('../db/models/login.model');

exports.authenticateAccessToken = function(req, res, next) {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.json({ status: 401 });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.json({ status: 403 });
    req.userId = user.userid;
    next();
  });
};

exports.authenticateRefreshToken = function(req, res, next) {
  if (res.statusCode !== 200) return res.json({ status: res.statusCode });
  const refreshToken = req.cookies['Refresh-Token'];

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.json({ status: 403 });
    req.body.userId = user.userid;
    req.body.username = user.username;
    res.status(200);
    next();
  });
};

exports.refreshTokenExists = function(req, res, next) {
  const refreshToken = req.cookies['Refresh-Token'];
  if (refreshToken == null) return res.json({ status: 401 });
  const jwtPayload = jwt.decode(req.cookies['Refresh-Token']);

  Token.refreshTokenExists(refreshToken, jwtPayload.userid, function(err, exists) {
    if (err) return res.json({ status: err });
    if (!exists) return res.json({ status: 401 });
    res.status(200);
    next();
  });
};

exports.validateUser = function(req, res, next) {
  const login = new Login(req.body);
  Login.validateUser(login, function(err, user) {
    if (err) return res.json({ status: err });
    req.userId = user.userId;
    res.status(200);
    next();
  });
};
