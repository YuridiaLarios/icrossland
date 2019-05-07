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
const users = require("./routes/users");
// const posts = require("./routes/posts");


app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(morgan(`API Request (port ${PORT}): :method :url :status :response-time ms - :res[content-length]`));


// get ability to use bodyParser for post, put, delete;
app.use(express.json()); 
app.enable("trust proxy");

// get ability to use created routes;
app.use("/api", users);
// app.use("/api", posts);

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