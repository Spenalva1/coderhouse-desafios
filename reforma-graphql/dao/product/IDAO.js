const DaoException = require('../DaoException.js');

class IProductDAO {
  constructor() {}

  async create(data) {
    throw new DaoException('falta implementar create()');
  }

  async findById(id) {
    throw new DaoException('falta implementar findById()');
  }

  async findAll() {
    throw new DaoException('falta implementar findAll()');
  }

  async update(id, toUpdate) {
    throw new DaoException('falta implementar update()');
  }

  async delete(id) {
    throw new DaoException('falta implementar delete()');
  }
}

module.exports = IProductDAO;
