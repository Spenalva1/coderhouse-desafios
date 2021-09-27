const Mongoose = require('mongoose');
const IProductDAO = require('./IDAO.js');
const Product = require('../../models/Product.js');
const ProductDTO = require('../../dto/productDTO.js');

const isValidId = Mongoose.Types.ObjectId.isValid;

class ProductMongoDAO extends IProductDAO {
  constructor() {
    super();
  }

  async create(data) {
    const { _id, title, price, thumbnail } = await Product.create(data);
    return new ProductDTO(_id, title, price, thumbnail);
  }

  async findById(id) {
    if (!isValidId(id)) return null;
    const product = await Product.findById(id);
    if (product) {
      const { _id, title, price, thumbnail } = product;
      return new ProductDTO(_id, title, price, thumbnail);
    }
    return null;
  }

  async findAll() {
    const products = await Product.find();
    return products.map(
      ({ _id, title, price, thumbnail }) =>
        new ProductDTO(_id, title, price, thumbnail)
    );
  }

  async update(id, toUpdate) {
    if (!isValidId(id)) return null;
    if (await Product.findByIdAndUpdate(id, toUpdate)) {
      return new ProductDTO(
        id,
        toUpdate.title,
        toUpdate.price,
        toUpdate.thumbnail
      );
    }
    return null;
  }

  async delete(id) {
    if (!isValidId(id)) return null;
    const { _id, title, price, thumbnail } = await Product.findByIdAndDelete(
      id
    );
    return new ProductDTO(_id, title, price, thumbnail);
  }
}

module.exports = new ProductMongoDAO();
