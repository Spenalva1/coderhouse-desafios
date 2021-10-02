const Mongoose = require('mongoose');
const Product = require('../../models/Product.js');
const User = require('../../models/User.js');
const Message = require('../../models/Message.js');

const models = { product: Product, message: Message, user: User };

const isValidId = Mongoose.Types.ObjectId.isValid;

class MongoLocal {
  constructor() {
    this.models = models;
  }

  create(key, data) {
    return this.models[key].create(data);
  }

  findAll(key) {
    return this.models[key].find({});
  }

  findById(key, id) {
    if (!isValidId(id)) return null;
    return this.models[key].findById(id);
  }

  async update(key, id, data) {
    if (!isValidId(id)) return null;
    try {
      if (await this.models[key].findByIdAndUpdate(id, data)) {
        return {
          _id: id,
          ...data,
        };
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  delete(key, id) {
    if (!isValidId(id)) return null;
    return this.models[key].findByIdAndDelete(id);
  }
}

module.exports = new MongoLocal();
