const Knex = require('knex');
const {
  SQL_HOST,
  SQL_USER,
  SQL_PASSWORD,
  SQL_DATABASE,
} = require('../../config/config');

class MySQL {
  constructor() {
    this.knex = Knex({
      client: 'mysql',
      connection: {
        host: SQL_HOST,
        user: SQL_USER,
        password: SQL_PASSWORD,
        database: SQL_DATABASE,
      },
    });
  }

  async create(key, data) {
    try {
      if (key === 'message') {
        const message = {
          message: data.message,
          date: data.date,
        };
        const [author] = await this.knex('author').where(
          'email',
          data.author.email
        );
        if (author) {
          message.author = author._id;
        } else {
          const [authorId] = await this.knex('author').insert(data.author);
          message.author = authorId;
        }
        const [_id] = await this.knex(key).insert(message);
        return {
          ...data,
          _id,
        };
      }
      const [_id] = await this.knex(key).insert(data);
      return {
        ...data,
        _id,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error al guardar.', error);
    }
  }

  async findAll(key) {
    let data;
    try {
      if (key === 'message') {
        data = await this.knex
          .select()
          .table('message')
          .leftJoin('author', 'author._id', 'message.author')
          .options({ nestTables: true });
        data = data?.map((data) => ({
          ...data.message,
          author: data.author,
        }));
      } else {
        data = await this.knex.select().table(key);
      }
      return data?.length ? data : [];
    } catch (error) {
      throw new Error('Error al leer.', error);
    }
  }

  async findById(key, id) {
    try {
      const data = await this.knex(key).where('_id', id);
      return data[0] ? data[0] : null;
    } catch (error) {
      console.error(error);
      throw new Error('Error al leer.', error);
    }
  }

  async update(key, id, data) {
    try {
      if (
        await this.knex(key)
          .where('_id', id)
          .update({ ...data })
      ) {
        return {
          ...data,
          _id: id,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar.', error);
    }
  }

  async delete(key, id) {
    try {
      const data = await this.knex(key).where('_id', id);
      if (data && (await this.knex(key).where('_id', id).del())) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error al borrar.', error);
    }
  }
}

module.exports = new MySQL();
