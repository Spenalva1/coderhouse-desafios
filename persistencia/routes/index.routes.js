const express = require('express');
const { isLoggedIn } = require('../middlewares/isLoggedIn.js');

const routerIndex = express.Router();

routerIndex.get('/', isLoggedIn, async (req, res) => {
  res.render('index', {
    name: req.user?.username,
    email: req.user?.email,
    photo: req.user?.photo,
  });
});

module.exports = routerIndex;
