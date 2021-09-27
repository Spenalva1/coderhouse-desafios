const fs = require('fs');
const CRUD = require('./CRUD');

const route = (key) => `storage/${key}.txt`;

class FileStorage extends CRUD {
  constructor() {
    super();
  }

  async create(key, data) {
    const el = {
      ...data,
      _id: Date.now(),
    };
    try {
      const content = JSON.parse(await fs.promises.readFile(route(key)));
      content.push(el);
      await fs.promises.writeFile(
        route(key),
        JSON.stringify(content, null, '\t')
      );
      return el;
    } catch (error) {
      console.error(error);
      throw new Error('Error al guardar.', error);
    }
  }

  async findAll(key) {
    try {
      const content = await fs.promises.readFile(route(key));
      const data = JSON.parse(content);
      return data ? data : null;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw new Error('Error al leer.', error);
    }
  }

  async findById(key, id) {
    try {
      const content = await fs.promises.readFile(route(key));
      const data = JSON.parse(content);
      const el = data?.find((el) => el._id == id);
      return el ? el : null;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw new Error('Error al leer.', error);
    }
  }

  async update(key, id, data) {
    try {
      const content = JSON.parse(await fs.promises.readFile(route(key)));
      const index = content.findIndex((el) => el._id == id);
      if (index === -1) {
        return null;
      }
      content[index] = {
        ...content[index],
        ...data,
      };

      await fs.promises.writeFile(
        route(key),
        JSON.stringify(content, null, '\t')
      );

      return content[index];
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw new Error('Error al actualizar.', error);
    }
  }

  async delete(key, id) {
    try {
      const content = JSON.parse(await fs.promises.readFile(route(key)));
      const index = content.findIndex((el) => el._id == id);
      if (index === -1) {
        return null;
      }
      const [el] = content.splice(index, 1);
      await fs.promises.writeFile(
        route(key),
        JSON.stringify(content, null, '\t')
      );
      return el;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw new Error('Error al borrar.', error);
    }
  }
}

module.exports = new FileStorage();
