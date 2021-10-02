const request = require('supertest')('http://localhost:8080/graphql');
const expect = require('chai').expect;
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../graphql/querys');

describe('test api graphql', () => {
  describe('listar', async () => {
    it('Debería retornar un array como data', async () => {
      const response = await request.post('').send({
        query: getProducts,
      });
      expect(response.body.data.Products).to.be.an('array');
    });
  });

  describe('guardar', async () => {
    it('Debería crear un producto', async () => {
      const response = await request.post('').send({
        query: createProduct,
        variables: {
          title: 'Creado con supertest',
          price: 123333333,
          thumbnail: 'supertest.com',
        },
      });
      expect(response.body.data.CreateProduct).include.keys(
        'title',
        'price',
        'thumbnail',
        '_id'
      );
      expect(response.body.data.CreateProduct.title).to.eql(
        'Creado con supertest'
      );
      expect(response.body.data.CreateProduct.price).to.eql(123333333);
      expect(response.body.data.CreateProduct.thumbnail).to.eql(
        'supertest.com'
      );
    });
  });

  describe('actualizar', async () => {
    it('Debería modificar un producto', async () => {
      let response = await request.post('').send({
        query: createProduct,
        variables: {
          title: 'Creado con supertest',
          price: 123333333,
          thumbnail: 'supertest.com',
        },
      });
      const productId = response.body.data.CreateProduct._id;
      response = await request.post('').send({
        query: updateProduct,
        variables: {
          id: productId,
          title: 'Creado con supertest modificado',
          price: 123,
          thumbnail: 'supertest.com2',
        },
      });
      expect(response.body.data.UpdateProduct).include.keys(
        'title',
        'price',
        'thumbnail',
        '_id'
      );
      expect(response.body.data.UpdateProduct.title).to.eql(
        'Creado con supertest modificado'
      );
      expect(response.body.data.UpdateProduct.price).to.eql(123);
      expect(response.body.data.UpdateProduct.thumbnail).to.eql(
        'supertest.com2'
      );
      expect(response.body.data.UpdateProduct._id).to.eql(productId);
    });
  });

  describe('borrar', async () => {
    it('Debería borrar un producto', async () => {
      let response = await request.post('').send({
        query: createProduct,
        variables: {
          title: 'Creado con supertest para ser borrado',
          price: 123333333,
          thumbnail: 'supertest.com',
        },
      });
      const productId = response.body.data.CreateProduct._id;
      response = await request.post('').send({
        query: deleteProduct,
        variables: {
          id: productId,
        },
      });
      expect(response.body.data.DeleteProduct).include.keys(
        'title',
        'price',
        'thumbnail'
      );
      expect(response.body.data.DeleteProduct.title).to.eql(
        'Creado con supertest para ser borrado'
      );
      expect(response.body.data.DeleteProduct.price).to.eql(123333333);
      expect(response.body.data.DeleteProduct.thumbnail).to.eql(
        'supertest.com'
      );
    });
  });
});
