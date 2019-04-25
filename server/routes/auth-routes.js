const router = require('express').Router();

// auth login (WILL BE RENDERING WITH REACT INSTEAD)
// router.get('/login', (req, res) => {
//   res.render('login', {
//       user: req.user
//   });
// });


// auth logout (WILL BE RENDERING WITH REACT INSTEAD)
// router.get('/logout', (req, res) => {
//   // handle with passport
//   //res.send('logging out');
//   req.logout();
//   res.redirect('/');
// });




// auth with google
router.get('/google', (req, res) => {
  res.send('loggin in with google');
  // scope: ['profile']
});




// callback route for google to redirect to
// hand control to passport to use code to grab profile info
// router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//   res.send(req.user);
//   // res.redirect('/profile/');
// });
module.exports = router;