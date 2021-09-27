const express = require('express');
const {
  getProcessInfo,
  getRandoms,
} = require('../controllers/process.controller.js');

const routerProcess = express.Router();

routerProcess.get('/info', getProcessInfo);

routerProcess.get('/randoms', getRandoms);

module.exports = routerProcess;
