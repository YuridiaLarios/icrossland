const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/user-model");
const UserFavStocks = require("../models/user-fav-stocks");
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
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

router.get("/public", function(req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this."
  });
});

router.get("/private", checkJwt, function(req, res) {
  // console.log("request: ", req)
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
  });
});

/*************************************
USER ROUTES
**************************************/

// GET ALL USERS
router.get("/users", function(req, res) {
  User.find({}, function(error, users) {
    if (error) {
      console.log("problem finding data");
      res.send("something went really wrong!!!");
    } else {
      res.json(users);
    }
  });
});

// GET USER BY ID
router.get("/users/:id", function(req, res) {
  User.findOne(
    {
      _id: req.params.id
    },
    function(error, user) {
      if (error) {
        console.log("problem finding data");
        res.send("something went really wrong!!!");
      } else {
        res.json(user);
      }
    }
  );
});

// GET MY PROFILE
router.get("/myProfile", function(req, res) {
  let myId = req.query[0];
  User.findOne(
    {
      _id: myId
    },
    function(error, user) {
      if (error) {
        console.log("problem finding data");
        res.send("something went really wrong!!!");
      } else {
        res.json(user);
      }
    }
  );
});

// GET MY ID
router.get("/currentUserID", function(req, res) {
  console.log("epifanio req: ", req.query.sub);
  let authID = req.query.sub;
  User.findOne(
    {
      authId: authID
    },
    function(error, user) {
      if (error) {
        console.log("problem finding data");
        res.send("something went really wrong!!!");
      } else {
        console.log(user);
        res.json(user);
        // use res.data._id in front end to retrieve id
        // use res.data to retrieve full profile
      }
    }
  );
});

// ADD/POST NEW USER TO DATABASE
router.post("/users", function(req, res) {
  User.findOne({
    authId: req.body.sub
  }).then(currentUser => {
    if (currentUser) {
      // already have user
      res.json(currentUser._id);
    } else {
      // if not, create user in our db
      User.create(
        {
          authId: req.body.sub,
          username: req.body.name,
          email: req.body.email,
          thumbnailFile: req.body.picture
        },
        function(error, data) {
          if (error) {
            console.log(
              "There was a problem adding a document to the collection."
            );
            console.log(error);
            res.sendStatus(500);
          } else {
            console.log("user was created!!!!!!", data);
            res.json(data);
          }
        }
      );
    }
  });
});

// DELETE USER BY ID
router.delete("/users/:id", function(req, res) {
  User.findOneAndRemove(
    {
      _id: req.params.id
    },
    function(error, user) {
      if (error) {
        console.log("problem finding data");
        res.send("something went really wrong!!!");
      } else {
        console.log("user deleted: ", req.params);
        res.json(user);
      }
    }
  );
});

// ADD SYMBOLS TO USER'S FAVORITE STOCKS
router.put("/stockFav", function(req, res) {
  //TODO: hardcoded id
  let id = "5cd71b9b3b04986c2f2cc1ff";
  let symbols = [...new Set(req.body)];

  console.log(symbols);

  User.findOne({ _id: id }, function(err, foundObject) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        foundObject.favoriteStocks = symbols;
        foundObject.save(function(err, updateObject) {
          if (err) {
            console.log(err);
            res.status(500).send();
          } else {
            res.send(updateObject);
          }
        });
      }
    }
  });
});

// GET MY SYMBOLS FOR FAVORITE STOCKS
router.get("/myFavoriteStocks", function(req, res) {
  console.log("caracol req: ", req.query[0]);
  let authID = req.query[0];
  User.findOne(
    {
      authId: authID
    },
    function(error, user) {
      if (error) {
        console.log("problem finding data");
        res.send("something went really wrong!!!");
      } else {
        console.log(user);
        res.json(user);
      }
    }
  );
});

module.exports = router;
