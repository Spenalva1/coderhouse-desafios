import express from 'express';
import fs from 'fs';

const PORT = 8080;
const RUTA = './productos.txt';
const app = express();
let productos;

const leerProductos = async () => {
  try {
    const contenido = await fs.promises.readFile(RUTA);
    productos = JSON.parse(contenido);
  } catch (error) {
    products = [];
  }
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

app.get('/items', async (req, res) => {
  try {
    visitas.items++;
    res.json({items: productos, cantidad: productos.length});    
  } catch (error) {
    res.json({error: 'Error del servidor'});
  }
})

app.get('/item-random', async (req, res) => {
  try {
    visitas.item++;
    const randomId = random(0, productos.length);
    res.json({item: productos[randomId]});    
  } catch (error) {
    res.json({error: 'Error del servidor'});
  }
})

app.get('/visitas', async (req, res) => {
  res.json({visitas});    
})

server.on('error', error => console.log(`Error en servidor ${error}`));