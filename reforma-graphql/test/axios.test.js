const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../graphql/querys');

// const axios = require('axios').default.create();
const axios = require('axios').default.create({
  baseURL: 'http://localhost:8080/graphql',
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
    const response = await axios.post('', {
      query: getProducts,
    });
    if (Array.isArray(response?.data?.data?.Products)) {
      console.log('Se pudieron leer los productos');
    } else {
      console.log('No se pudieron leer los productos', response.data);
    }
  } catch (error) {
    console.error('No se pudieron leer los productos', error.response.data);
  }
}

async function pruebaAxiosCrear() {
  try {
    const response = await axios.post('', {
      query: createProduct,
      variables: {
        title: 'Creado con axios',
        price: 123333333,
        thumbnail: 'axios.com',
      },
    });
    if (response?.data?.data?.CreateProduct) {
      const { title, thumbnail, price, _id } =
        response?.data?.data?.CreateProduct;
      if (title && thumbnail && price && _id) {
        productId = _id;
        console.log('Se pudo crear un producto');
        return;
      }
    }
    console.error('No se pudo crear un producto', response.data);
  } catch (error) {
    console.error('No se pudo crear un producto', error.response.data);
  }
}

async function pruebaAxiosActualizar() {
  try {
    const response = await axios.post(``, {
      query: updateProduct,
      variables: {
        id: productId,
        title: 'Modificado con axios',
        price: 123333333,
        thumbnail: 'axios.com',
      },
    });
    if (response?.data?.data?.UpdateProduct) {
      const { title, thumbnail, price, _id } =
        response?.data?.data?.UpdateProduct;
      if (title && thumbnail && price && _id) {
        console.log('Se pudo modificar un producto');
        return;
      }
    }
    console.error('No se pudo modificar un producto', response.data);
  } catch (error) {
    console.error('No se pudo modificar un producto', error.response.data);
  }
}

async function pruebaAxiosBorrar() {
  try {
    const response = await axios.post('', {
      query: deleteProduct,
      variables: {
        id: productId,
      },
    });
    if (response?.data?.data?.DeleteProduct) {
      const { title, thumbnail, price } = response?.data?.data?.DeleteProduct;
      if (title && thumbnail && price) {
        console.log('Se pudo borrar un producto');
        return;
      }
    }
    console.error('No se pudo borrar un producto', response.data);
  } catch (error) {
    console.error('No se pudo borrar un producto', error.response.data);
  }
}

pruebasAxios();
