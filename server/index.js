const express = require('express');
const app = express();
const path = require('path');


app.use(express.json()); // get ability to use body for post, put, delete;


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