const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user-model');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');




app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(morgan(`API Request (port ${PORT}): :method :url :status :response-time ms - :res[content-length]`));

app.use(express.json()); // get ability to use body for post, put, delete;
app.enable('trust proxy');




// // POST route to register a user
// app.post('/api/register', function(req, res) {
//   const { email, authID, username, } = req.body;
//   const user = new User({ email, authID, username });
//   user.save(function(err) {
//     if (err) {
//       res.status(500)
//         .send("Error registering new user please try again.");
//     } else {
//       res.status(200).send("Welcome to the club!");
//     }
//   });
// });


const {
  Pool
} = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/icrossland_db',
  ssl: process.env.NODE_ENV === 'production'
})


pool.connect();


app.get('/users', async (req, res) => {
  const client = await pool.connect();
  var users = await client.query("SELECT * FROM users");
  res.json(users.rows);
  client.release();
});


const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});


app.get('/api/public', function (req, res) {
  res.json({
    message: "Hello from a public endpoint! You don't need to be authenticated to see this."
  });
});

app.get('/api/private', function (req, res) {
  res.json({
    message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
  });
});



app.listen(PORT, console.log(`The monster octupus application is running on port ${PORT}`));


// Add this below all your other routes
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}