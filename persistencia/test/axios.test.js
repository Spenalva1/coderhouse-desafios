const axios = require('axios').default.create({
  baseURL: 'http://localhost:8080/api',
});

let productId;

async function pruebasAxios() {
  await pruebaAxiosListar();
  await pruebaAxiosCrear();
  await pruebaAxiosActualizar();
  await pruebaAxiosBorrar();
}

async function pruebaAxiosListar() {
  try {
    const response = await axios.get('/productos/listar');
    if (Array.isArray(response.data)) {
      console.log('Se pudieron leer los productos');
    } else {
      console.log('No se pudieron leer los productos');
    }
  } catch (error) {
    console.error('No se pudieron leer los productos', error.message);
  }
}

async function pruebaAxiosCrear() {
  try {
    const response = await axios.post('/productos/guardar', {
      title: 'Creado con axios',
      price: '123333333',
      thumbnail: 'axios.com',
    });
    const { title, thumbnail, price, _id } = response.data;
    if (title && thumbnail && price && _id) {
      productId = _id;
      console.log('Se pudo crear un producto');
    } else {
      console.error('No se pudo crear un producto', error.message);
    }
  } catch (error) {
    console.error('No se pudo crear un producto', error.message);
  }
}

async function pruebaAxiosActualizar() {
  try {
    const response = await axios.put(`/productos/actualizar/${productId}`, {
      title: 'Modificado con axios',
      price: '123333333',
      thumbnail: 'axios.com',
    });
    const { title, thumbnail, price } = response.data;
    if (title && thumbnail && price) {
      console.log('Se pudo modificar un producto');
    } else {
      console.error('No se pudo modificar un producto', error.response);
    }
  } catch (error) {
    console.error('No se pudo modificar un producto', error.message);
  }
}

async function pruebaAxiosBorrar() {
  try {
    const response = await axios.delete(`/productos/borrar/${productId}`);
    const { title, thumbnail, price } = response.data;
    if (title && thumbnail && price) {
      console.log('Se pudo borrar un producto');
    } else {
      console.error('No se pudo borrar un producto', error.response);
    }
  } catch (error) {
    console.error('No se pudo borrar un producto', error.message);
  }
}

pruebasAxios();
