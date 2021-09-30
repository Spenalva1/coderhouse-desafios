const { PERSISTENCE_MODE } = require('../config/config.js');

const type = PERSISTENCE_MODE;

class PersistenceFactory {
  persistence = null;

  constructor() {}

  getPersistence() {
    try {
      if (!this.persistence) {
        this.persistence = require(`./persistences/${type}.js`);
      }
      return this.persistence;
    } catch (error) {
      console.log('No se encontro el tipo de persistencia:', type, error);
    }
  }
}

module.exports = new PersistenceFactory();
