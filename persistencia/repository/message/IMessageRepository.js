class IMessageRepository {
  constructor() {}

  async create(data) {
    throw new DaoException('falta implementar create()');
  }

  async findAll() {
    throw new DaoException('falta implementar findAll()');
  }
}

module.exports = IMessageRepository;
