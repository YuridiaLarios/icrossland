const express = require('express');
const app = express();

app.use(express.json()); // get ability to use body for post, put, delete;

const {
  Pool
} = require('pg')
const pool = new Pool({
  host: 'localhost',
  database: 'icrossland_db',
  port: 5432
})


pool.connect();

app.get('/', (req, res) => {
  res.send('Hello from my final project');
});

app.get('/users', async (req, res) => {
  const client = await pool.connect();
  var users = await client.query("SELECT * FROM users");
  res.json(users.rows);
  client.release();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`The monster octupus application is running on port ${PORT}`));