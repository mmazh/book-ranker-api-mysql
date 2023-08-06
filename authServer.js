require('dotenv').config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const loginController = require('./controllers/login.controller');
const Token = require('./db/models/token.model');

const app = express();
const PORT = 8081;

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello World");
});

// Authenticate User Credentials
app.post('/login', loginController.validateUser, (req, res) => {
    if (res.statusCode !== 200) return res;

    const data = { userid: req.userId, username: req.body.username };
    const accessToken = generateAccessToken(data);
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);

    Token.add(refreshToken, req.userId, function(err, token) {
      if (err) return res.send(err);
      res.status(200).send({accessToken: accessToken, refreshToken: refreshToken});
    });
});

// Generate new access token using refresh token
app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      Token.refreshTokenExists(refreshToken, user.userid, function(err, exists) {
        if (err) return res.send(err);
        if (!exists) return res.sendStatus(401);
        
        const data = { userid: user.userid, username: user.username };
        const accessToken = generateAccessToken(data);
        res.status(200).json({ accessToken: accessToken }); 
      });
   });
});


// Delete refresh token after user logs out
app.delete('/logout', (req, res) => {
    const decodedToken = jwt.decode(req.body.token);
    Token.delete(decodedToken.userid, function(err, token) {
      if (err) return res.send(err);
      res.sendStatus(200);
    });
});

function generateAccessToken(data) {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'});
}

app.listen(PORT, () => {
  console.log(`Auth Server is running on port ${PORT}.`);
});
