const type = process.env.PERSISTENCE_MODE || 'Mongo';

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
