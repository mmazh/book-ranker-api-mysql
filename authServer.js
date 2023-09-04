require('dotenv').config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const auth = require('./middleware/auth.middleware');
const Token = require('./db/models/token.model');
const Login = require('./db/models/login.model');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8081;

app.use(cookieParser());
app.use(cors({ 
  origin: 'http://localhost:4200',
  methods: "GET,POST,DELETE,UPDATE,PUT",
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 200 });
});


// Authenticate User Credentials
app.post('/login', auth.validateUser, (req, res) => {
  if (res.statusCode !== 200) return res.json({ status: res.statusCode });

  const data = { userid: req.userId, username: req.body.username };
  const accessToken = generateAccessToken(data);
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);

  Token.add(refreshToken, req.userId, function(err, token) {
    if (err) return res.json({ status: 500 });
    res.cookie("Refresh-Token", refreshToken, { 
      domain: 'localhost',
      secure: true,
      httpOnly: true,
      sameSite: 'none' 
    });
    res.send({status: 200, accessToken: accessToken});
  });
});


// Generate new access token using refresh token
app.get('/token', auth.refreshTokenExists, auth.authenticateRefreshToken, (req, res) => {
  if (res.statusCode !== 200) return res.json({ status: res.statusCode });
  console.log(req.body);
  
  const data = { userid: req.body.userId, username: req.body.username };
  const accessToken = generateAccessToken(data);
  res.json({ status: 200, accessToken: accessToken }); 
});


// Delete refresh token after user logs out
app.delete('/logout', (req, res) => {
  const refreshToken = req.cookies['Refresh-Token'];
  if (typeof refreshToken == "undefined") return res.json({ status: 200 });
  
  const userId = JSON.parse(atob(refreshToken.split('.')[1]))['userid'];
  res.clearCookie('Refresh-Token');
  Token.delete(userId, function(err, token) {
    if (err) return res.json({ status: 500 });
    res.json({ status: 200 });
  });
});


// Delete a user
app.delete('/user', auth.authenticateAccessToken, (req, res) => {
  Login.delete(req.userId, function(err, val) {
  if (err) return res.json({ status: 500 });
  res.json({ status: 200 });
  })
});


function generateAccessToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'});
}


app.listen(PORT, () => {
  console.log(`Auth Server is running on port ${PORT}.`);
});
