const IProductDAO = require('./IDAO.js');
const ProductDTO = require('../../dto/productDTO.js');

class ProductMemoryDAO extends IProductDAO {
  constructor() {
    super();
    this.products = [];
  }

  async create(data) {
    const product = new ProductDTO(
      Date.now(),
      data.title,
      data.price,
      data.thumbnail
    );
    this.products.push(product);
    return product;
  }

  async findById(id) {
    const product = this.products.find((product) => product._id == id);
    if (!product) {
      return null;
    }
    const { _id, title, price, thumbnail } = product;
    return new ProductDTO(_id, title, price, thumbnail);
  }

  async findAll() {
    return this.products.map(
      ({ _id, title, price, thumbnail }) =>
        new ProductDTO(_id, title, price, thumbnail)
    );
  }

  async update(id, toUpdate) {
    const index = this.products.findIndex((product) => product._id == id);
    if (index === -1) {
      return null;
    }
    this.products[index] = {
      ...this.products[index],
      ...toUpdate,
    };
    return new ProductDTO(
      id,
      toUpdate.title,
      toUpdate.price,
      toUpdate.thumbnail
    );
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product._id == id);
    if (index === undefined || index === -1) {
      return null;
    }
    const [product] = this.products.splice(index, 1);
    return new ProductDTO(id, product.title, product.price, product.thumbnail);
  }
}

module.exports = new ProductMemoryDAO();
