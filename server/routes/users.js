const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/user-model");
const jwt = require("express-jwt");
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require("jwks-rsa");


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



/*************************************
 ROUTES FOR TESTING PURPOSES
**************************************/

router.get("/public", function (req, res) {
  res.json({
    message: "Hello from a public endpoint! You don't need to be authenticated to see this."
  });
});

router.get("/private", function (req, res) {
  res.json({
    message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
  });
});



/*************************************
ACTUAL ROUTES
**************************************/

// GET ALL USERS
router.get("/users", function (req, res) {
  User.find({}, function (error, users) {
    if (error) {
      console.log("problem finding data");
      res.send("something went really wrong!!!");
    } else {
      res.json(users);
    }
  });
})


// GET USER BY ID
router.get("/users/:id", function (req, res) {
  User.findOne({
    _id: req.params.id
  }, function (error, user) {
    if (error) {
      console.log("problem finding data");
      res.send("something went really wrong!!!");
    } else {
      res.json(user);
    }
  })
});




// ADD/POST NEW USER TO DATABASE
router.post("/users", function (req, res) {
  User.findOne({
    authId: req.body.sub
  }).then((currentUser) => {
    if (currentUser) {
      // already have user
      console.log("User is already register");
      console.log("User is ", currentUser);
    } else {
      // if not, create user in our db
      User.create({
        authId: req.body.sub,
        username: req.body.name,
        email: req.body.email,
        thumbnailFile: req.body.picture,
      }, function (error, data) {
        if (error) {
          console.log("There was a problem adding a document to the collection.");
          console.log(error);
          res.sendStatus(500)
        } else {
          res.json(data);
        }
      })
    }
  })
});



// DELETE USER BY ID
router.delete("/users/:id", function (req, res) {
  User.findOneAndRemove({
    _id: req.params.id
  }, function (error, user) {
    if (error) {
      console.log("problem finding data");
      res.send("something went really wrong!!!");
    } else {
      console.log("user deleted: ", req.params);
      res.json(user);
    }
  })
});


module.exports = router;