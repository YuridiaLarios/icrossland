// require('dotenv').config();
// const User = require('../models/user-model');


// // POST route to register a user
// // app.post('/api/register', function(req, res) {
// //     const { email, authID, username, } = req.body;
// //     const user = new User({ email, authID, username });
// //     user.save(function(err) {
// //       if (err) {
// //         res.status(500)
// //           .send("Error registering new user please try again.");
// //       } else {
// //         res.status(200).send("Welcome to the club!");
// //       }
// //     });
// //   });




// // passport.use(
// //     new GoogleStrategy({
// //         // options for google strategy
// //         clientID: process.env.DB_GOOGLEID,
// //         clientSecret: process.env.DB_CLIENTSECRET,
// //         callbackURL: '/auth/google/redirect'
// //     }, (accessToken, refreshToken, profile, done) => {
// //         // check if user already exists in our own db
// //         console.log("passport callback function fired");
// //         console.log(profile);
// //         User.findOne({
// //             googleId: profile.id
// //         }).then((currentUser) => {
// //             if (currentUser) {
// //                 // already have the user
// //                 console.log('user already exists: ', currentUser);
// //                 done(null, currentUser);
// //             } else {
// //                 // if not, create user in our db
// //                 new User({
// //                     username: profile.displayName,
// //                     googleId: profile.id,
// //                 }).save().then((newUser) => {
// //                     console.log("new user created: " + newUser);
// //                     done(null, newUser);
// //                 })
// //             }
// //         })
// //     })
// // );