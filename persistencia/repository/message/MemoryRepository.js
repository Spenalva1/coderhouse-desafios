const IMesaggeRepository = require('./IMessageRepository.js');

class ProductMemoryDAO extends IMesaggeRepository {
  constructor() {
    super();
    this.messages = [];
  }

  async create(data) {
    const message = {
      _id: Date.now(),
      message: data.message,
      author: data.author,
      date: data.date,
    };
    this.messages.push(message);
    return message;
  }

  async findAll() {
    return this.messages;
  }
}

module.exports = new ProductMemoryDAO();
