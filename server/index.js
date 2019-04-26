const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const authRoutes = require('./routes/auth-routes');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');



app.use(express.json()); // get ability to use body for post, put, delete;
app.enable('trust proxy');

// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 10000,
  keys: [process.env.DB_COOKIEKEY]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);

//connect to mongodb
mongoose.connect(process.env.DB_MONGODBURI,{
  useNewUrlParser: true
}, function(error) {
  if(error){
      console.log(error);
  } else {
      console.log('connected to amazing mongodb yay !!!');
  }
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





const PORT = process.env.PORT || 3000;
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