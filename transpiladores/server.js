'use strict';

var express = require('express');
var fs = require("fs");

var PORT = 8080;
var RUTA = './productos.txt';
var app = express();
var productos = void 0;

var leerProductos = function leerProductos() {
  fs.promises.readFile(RUTA).then(function (data) {
    productos = JSON.parse(data);
  }).catch(function (error) {
    productos = [];
  });
};

var random = function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var visitas = {
  items: 0,
  item: 0
};

var server = app.listen(PORT || 8080, function () {
  leerProductos();
  console.log('servidor inicializado en puerto ' + server.address().port);
});

app.get('/items', function (req, res) {
  visitas.items++;
  res.json({ items: productos, cantidad: productos.length });
});

app.get('/item-random', function (req, res) {
  visitas.item++;
  var randomId = random(0, productos.length);
  res.json({ item: productos[randomId] });
});

app.get('/visitas', function (req, res) {
  res.json({ visitas: visitas });
});

server.on('error', function (error) {
  return console.log('Error en servidor ' + error);
});
