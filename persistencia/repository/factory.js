const type = process.env.PERSISTENCE_MODE || 'Mongo';

class RepositoryFactory {
  repository = null;

  constructor() {}

  getRepository() {
    try {
      if (!this.repository) {
        this.repository = require(`./message/${type}Repository.js`);
      }
      return this.repository;
    } catch (error) {
      console.log('No se encontro el Repository:', type, error);
    }
  }
}

module.exports = new RepositoryFactory();
