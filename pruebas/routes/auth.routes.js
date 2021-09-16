const express = require('express');
const { sendEmailEth } = require('../lib/mail.js');
const {
  passport,
  logoutEmailText,
} = require('../middlewares/passport_config.js');

const routerAuth = express.Router();

routerAuth.get('/login', (req, res) => res.render('login'));

routerAuth.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

routerAuth.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

routerAuth.get('/logout', (req, res) => {
  const name = req.user.username;
  req.logout();
  sendEmailEth(logoutEmailText(name), 'Usuario deslogueado');
  res.render('logout', { name });
});

module.exports = routerAuth;
