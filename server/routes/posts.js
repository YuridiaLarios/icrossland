const router = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
const User = require("../models/user-model");
const Post = require("../models/post-model");

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
    message: "Hello from a public endpoint! in posts route ."
  });
});

/*************************************
ACTUAL ROUTES
**************************************/
// GET ALL POST
router.get("/", function (req, res) {
  Post.find({}, function (error, posts) {
    if (error) {
      console.log("problem finding data");
      res.send("something went really wrong!!!");
    } else {
      res.json(posts);
    }
  });
})



// GET POST BY ID
router.get("/:id", function (req, res) {
  Post.findOne({
    _id: req.params.id
  }, function (error, post) {
    if (error) {
      console.log("problem finding data");
      res.send("something went really wrong!!!");
    } else {
      res.json(post);
    }
  })
});



// POST NEW POST
router.post("/newPost", async function(req, res) {
  const user = await User.findById(req.body.id); // returns a promise so you need await
  // const user = User.findById(req.user.id);

  if (user) {
    const newPost = new Post({
      text: req.body.text,
      name: user.username,
      avatar: user.thumbnailFile,
      user: user._id
    });
    newPost.save().then(post => res.json(post));
  } else {
    console.error(err.message);
    res.status(500).send("server error");
  }
});


// DELETE POST BY ID
router.delete("/:id", function (req, res) {
  Post.findOneAndRemove({
    _id: req.params.id
  }, function (error, post) {
    if (error) {
      console.log("problem finding data");
      res.send("something went really wrong!!!");
    } else {
      console.log(`post with id: ${req.params}`);
      res.json(post);
    }
  })
});

module.exports = router;
