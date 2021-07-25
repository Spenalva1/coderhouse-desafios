const express = require('express');
const fs = require("fs");

const PORT = 8080;
const RUTA = './productos.txt';
const app = express();
let productos;

const leerProductos = () => {
  fs.promises.readFile(RUTA).then(data => {
    productos = JSON.parse(data);
  }).catch(error => {
    productos = []
  });
}

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

const visitas = {
  items: 0,
  item: 0,
}

const server = app.listen(PORT || 8080, () => {
  leerProductos();
  console.log(`servidor inicializado en puerto ${server.address().port}`);
})

app.get('/items', (req, res) => {
  visitas.items++;
  res.json({items: productos, cantidad: productos.length});
})

app.get('/item-random', (req, res) => {
  visitas.item++;
  const randomId = random(0, productos.length);
  res.json({item: productos[randomId]});
})

app.get('/visitas', (req, res) => {
  res.json({visitas});
})

server.on('error', error => console.log(`Error en servidor ${error}`));