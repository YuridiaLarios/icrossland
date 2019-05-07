const router = require("express").Router();
// import mongoose from "mongoose";
import Post from "../models/post-model";
import jwt from "express-jwt";
import jwtAuthz from "express-jwt-authz";
import jwksRsa from "jwks-rsa";

/*************************************
 ROUTES FOR TESTING PURPOSES
**************************************/

router.get("/posts", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this."
  });
});

/*************************************
ACTUAL ROUTES
**************************************/

// ADD/POST NEW USER TO DATABASE
router.post("/newPost", function (req, res) {
  const text = req.body.text.trim();
  res.send("Test ok!");
  // Post.create({
  //   authId: req.body.sub,
  //   username: req.body.name,
  //   email: req.body.email,
  //   thumbnailFile: req.body.picture
  // }, function (error, data) {
  //   if (error) {
  //     console.log("There was a problem adding a document to the collection.");
  //     console.log(error);
  //     res.sendStatus(500)
  //   } else {
  //     res.json(data);
  //   }
  // })
});

// DELETE USER BY ID
router.delete("/users/:id", function (req, res) {
  User.findOneAndRemove(
    {
      _id: req.params.id
    },
    function (error, user) {
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

export default router;
