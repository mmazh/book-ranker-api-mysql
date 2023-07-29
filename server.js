const express = require("express");
const cors = require("cors");
const bookRoutes = require('./routes/book.routes')
const loginRoutes = require('./routes/login.routes')
const votesRoutes = require('./routes/votes.routes')

const app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST");
//   next();
// });

app.use(cors());
app.options('*', cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// root route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// using as middleware
app.use('/book', bookRoutes);
app.use('/login', loginRoutes);
app.use('/votes', votesRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
