const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User.js');

passport.use(new FacebookStrategy(
  {
    clientID: process.argv[3] || process.env.FACEBOOK_APP_ID,
    clientSecret: process.argv[4] || process.env.FACEBOOK_APP_KEY,
    callbackURL: `http://localhost:${process.argv[2] || process.env.PORT || 8080}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos', 'emails'],
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('he')
    User.findOrCreate(
      {
        facebookId: profile.id,
        username: profile.displayName,
        photo: profile.photos[0].value,
        email: profile.emails[0].value
      },
      function(err, user, created) {
        if (err) { return done(err) }
        done(null, user);
      }
    )
  }
))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;