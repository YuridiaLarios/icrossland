const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// setup environment
dotenv.config();
const app = express();
const path = require('path');
const User = require('./models/user-model');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(morgan(`API Request (port ${PORT}): :method :url :status :response-time ms - :res[content-length]`));


// get ability to use bodyParser for post, put, delete;
app.use(express.json()); 
app.enable('trust proxy');


// mongo db connect
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_MONGODBURI, {
  useNewUrlParser: true
}, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("connected to mongo database yay!")
  }
});


/*************************************
 ROUTES FOR TESTING PURPOSES
**************************************/
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


/*************************************
ACTUAL ROUTES
**************************************/
app.get('/api/allusers', function(req, res) {
  User.find({}, function(error, users){
    if(error){
      console.log("problem finding data");
      res.send("something went really wrong!!!");
      next();
    } 
    // console.log(users);
    res.json(users);
  });
})

app.post('/api/user', function(req,res) {
  User.findOne({authId: req.body.sub}).then((currentUser) => {
    if (currentUser) {
      // already have user
      console.log('User is ', currentUser);
    } else {
      // if not, create user in our db
      User.create({
        authId: req.body.sub,
        username: req.body.name,
        email: req.body.email,
        thumbnailFile: req.body.picture
      }, function(error, data){
        if(error){
          console.log("There was a problem adding a document to the collection.");
          console.log(error);
          res.sendStatus(500)
        } else {
          console.log("Data added to collection: ");
          console.log(data);
          res.sendStatus(200)
        }
      })
    }
  })
});


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


// Run app
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