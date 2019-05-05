const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// setup environment
dotenv.config();
const app = express();
const path = require("path");
const User = require("./models/user-model");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const users = require("./routes/users");

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(morgan(`API Request (port ${PORT}): :method :url :status :response-time ms - :res[content-length]`));


// get ability to use bodyParser for post, put, delete;
app.use(express.json()); 
app.enable("trust proxy");

app.use("/api", users);

// mongo db connect
mongoose.set("useCreateIndex", true)
mongoose.connect(process.env.DB_MONGODBURI, {
  useNewUrlParser: true
}, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("connected to mongo database yay!")
  }
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
  algorithms: ["RS256"]
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