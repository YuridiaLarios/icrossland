const router = require('express').Router();
const passport = require('passport');

// auth login (WILL BE RENDERING WITH REACT INSTEAD)
// router.get('/login', (req, res) => {
//   res.render('login', {
//       user: req.user
//   });
// });


// auth logout (WILL BE RENDERING WITH REACT INSTEAD)
router.get('/logout', (req, res) => {
  // handle with passport
  //res.send('logging out');
  req.logout();
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
  res.redirect('/profile/' + req.user.username);
});
module.exports = router;