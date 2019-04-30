const router = require('express').Router();
const passport = require('passport');

let userData;

// auth login (WILL BE RENDERING WITH REACT INSTEAD)
// router.get('/login', (req, res) => {
//   res.render('login', {
//       user: req.user
//   });
// });


// auth logout (WILL BE RENDERING WITH REACT INSTEAD)
router.get('/logoutme', (req, res) => {
  // handle with passport
  //res.send('logging out');
  userData = null;
  req.logout();
  console.log('User signed out.');
  res.redirect('/');
});





// real auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));




// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  console.log('you reached the callback URI');
  console.log(req.user);
  userData = req.user;
  res.json(userData);
  //res.send(req.user);
  // res.redirect('/profile/' + req.user.username);
});




router.get('/userinfo', async (req, res) => {
  let userInfo = userData;
  res.json(userInfo);
});


// app.get('/users', async (req, res) => {
//   const client = await pool.connect();
//   var users = await client.query("SELECT * FROM users");
//   res.json(users.rows);
//   client.release();
// });
module.exports = router;