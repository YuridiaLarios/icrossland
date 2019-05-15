const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// setup environment
dotenv.config();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
const users = require("./routes/users");
const posts = require("./routes/posts");
const stocks = require("./routes/stockMarket");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(
  morgan(
    `API Request (port ${PORT}): :method :url :status :response-time ms - :res[content-length]`
  )
);

// get ability to use bodyParser for post, put, delete;
app.use(express.json());
app.enable("trust proxy");

// Define Routes;
app.use("/api", users);
app.use("/api/posts", posts);
app.use("/api/stocks", stocks);
// app.use("/api/profile", profile);

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 50,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

app.get("/private", checkJwt, function(req, res) {
  // console.log("request: ", req)
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
  });
});

// mongo db connect
if (process.env.NODE_ENV !== "test") {
  mongoose.set("useCreateIndex", true);
  mongoose.connect(
    process.env.DB_MONGODBURI,
    {
      useNewUrlParser: true
    },
    function(error) {
      if (error) {
        console.log(error);
      } else {
        console.log("connected to mongo database yay!");
      }
    }
  );
}

// Run app
app.listen(
  PORT,
  console.log(`The monster octupus application is running on port ${PORT}`)
);

// Add this below all your other routes
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}
