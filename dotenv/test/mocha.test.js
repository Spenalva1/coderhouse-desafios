const request = require('supertest')('http://localhost:8080/api/productos');
const expect = require('chai').expect;

describe('test api rest', () => {
  describe('listar', async () => {
    it('Debería retornar un status 200', async () => {
      const response = await request.get('/listar');
      expect(response.status).to.eql(200);
    });
    it('Debería retornar un array como data', async () => {
      const response = await request.get('/listar');
      expect(response.body).to.be.an('array');
    });
  });

  describe('guardar', async () => {
    it('Debería retornar un status 201 y crear un producto', async () => {
      const response = await request.post('/guardar').send({
        title: 'Creado con supertest',
        price: 123333333,
        thumbnail: 'supertest.com',
      });
      expect(response.status).to.eql(201);
      expect(response.body).include.keys('title', 'price', 'thumbnail', '_id');
      expect(response.body.title).to.eql('Creado con supertest');
      expect(response.body.price).to.eql(123333333);
      expect(response.body.thumbnail).to.eql('supertest.com');
    });
  });

  describe('actualizar', async () => {
    it('Debería retornar un status 201 y modificar un producto', async () => {
      let response = await request.post('/guardar').send({
        title: 'Creado con supertest',
        price: 123333333,
        thumbnail: 'supertest.com',
      });
      const productId = response.body._id;
      response = await request.put(`/actualizar/${productId}`).send({
        title: 'Creado con supertest modificado',
        price: 123,
        thumbnail: 'supertest.com2',
      });
      expect(response.status).to.eql(201);
      expect(response.body).include.keys('title', 'price', 'thumbnail', '_id');
      expect(response.body.title).to.eql('Creado con supertest modificado');
      expect(response.body.price).to.eql(123);
      expect(response.body.thumbnail).to.eql('supertest.com2');
      expect(response.body._id).to.eql(productId);
    });
  });

  describe('borrar', async () => {
    it('Debería retornar un status 200 y borrar un producto', async () => {
      let response = await request.post('/guardar').send({
        title: 'Creado con supertest para ser borrado',
        price: 123333333,
        thumbnail: 'supertest.com',
      });
      const productId = response.body._id;
      response = await request.delete(`/borrar/${productId}`);
      expect(response.status).to.eql(200);
      expect(response.body).include.keys('title', 'price', 'thumbnail', '_id');
      expect(response.body.title).to.eql(
        'Creado con supertest para ser borrado'
      );
      expect(response.body.price).to.eql(123333333);
      expect(response.body.thumbnail).to.eql('supertest.com');
      expect(response.body._id).to.eql(productId);
      response = await request.get(`/listar/${productId}`);
      expect(response.status).to.eql(404);
    });
  });
});
