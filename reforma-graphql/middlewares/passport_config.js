const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_KEY,
  FACEBOOK_CALLBACK_URL,
} = require('../config/config.js');
const User = require('../models/User.js');
const { sendEmailEth, sendEmailGmail } = require('../lib/mail.js');

const loginEmailText = (name) =>
  `El usuario de nombre ${name} se ha logueado a las ${new Date().toLocaleTimeString()} del ${new Date().toLocaleDateString()}`;

const logoutEmailText = (name) =>
  `El usuario de nombre ${name} se ha deslogueado a las ${new Date().toLocaleTimeString()} del ${new Date().toLocaleDateString()}`;

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_KEY,
      callbackURL: FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'displayName', 'photos', 'emails'],
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate(
        {
          facebookId: profile.id,
          username: profile.displayName,
          photo: profile.photos[0].value,
          email: profile.emails[0].value,
        },
        function (err, user, created) {
          if (err) {
            return done(err);
          }
          sendEmailEth(loginEmailText(profile.displayName), 'Usuario logueado');
          sendEmailGmail(
            loginEmailText(profile.displayName),
            'Usuario logueado',
            profile.emails[0].value,
            profile.photos[0].value
          );
          done(null, user);
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = {
  passport,
  loginEmailText,
  logoutEmailText,
};
