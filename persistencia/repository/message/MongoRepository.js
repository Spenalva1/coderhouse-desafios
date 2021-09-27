const ICRUD = require('./IMessageRepository.js');
const Message = require('../../models/Message.js');

class MessageMongoRepository extends ICRUD {
  constructor() {
    super();
  }

  async create(data) {
    return Message.create(data);
  }

  async findAll() {
    return Message.find();
  }
}

module.exports = new MessageMongoRepository();
