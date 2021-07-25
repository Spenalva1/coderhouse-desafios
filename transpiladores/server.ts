import express, {Request, Response} from 'express';
import * as fs from "fs";

const PORT = 8080;
const RUTA = './productos.txt';
const app = express();

interface Producto {
    titulo: string
    precio: number
    thumbnail: string
    id: number
}

interface Visitas {
    items: number;
    item: number;
}

let productos: Producto[];

const leerProductos = () => {
  fs.promises.readFile(RUTA).then(data => {
    productos = JSON.parse(data as any);
  }).catch(error => {
    productos = []
  });
}

const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min);

const visitas: Visitas = {
  items: 0,
  item: 0,
}

const server = app.listen(PORT || 8080, () => {
  leerProductos();
  console.log(`servidor inicializado en puerto ${PORT || 8080}`);
})

app.get('/items', (req: Request, res: Response) => {
  visitas.items++;
  res.json({items: productos, cantidad: productos.length});
})

app.get('/item-random', (req: Request, res: Response) => {
  visitas.item++;
  const randomId = random(0, productos.length);
  res.json({item: productos[randomId]});
})

app.get('/visitas', (req: Request, res: Response) => {
  res.json({visitas});
})

server.on('error', error => console.log(`Error en servidor ${error}`));