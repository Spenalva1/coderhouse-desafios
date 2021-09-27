const type = process.env.PERSISTENCE_MODE || 'Mongo';

class DAOFactory {
  DAO = null;

  constructor() {}

  getDAO() {
    try {
      if (!this.DAO) {
        this.DAO = require(`./product/${type}DAO.js`);
      }
      return this.DAO;
    } catch (error) {
      console.log('No se encontro el DAO:', type, error);
    }
  }
}

module.exports = new DAOFactory();
