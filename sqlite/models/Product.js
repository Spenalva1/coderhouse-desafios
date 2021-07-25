import {default as Knex} from 'knex';

const knex = Knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'productos',
  },
});

knex.schema.hasTable('productos').then((exists) => {
  if (!exists) {
    return knex.schema.createTable('productos', (t) => {
      t.increments('id').primary();
      t.string('title', 50);
      t.string('thumbnail', 50);
      t.float('price');
    });
  }
});

async function getProducts() {
  try {
    const products = await knex.select().table('productos');
    return products?.length ? products : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getProduct(id) {
  try {
    const product = await knex('productos').where('id', id);
    return product[0] ? product[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function addProduct(title, price, thumbnail) {
  try {
    const newProduct = { title, price, thumbnail };
    const id = await knex('productos').insert(newProduct);
    if (id) {
      return {
        ...newProduct,
        id,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateProduct(id, title, price, thumbnail) {
  try {
    const newProduct = { title, price, thumbnail };
    if (
      await knex('productos')
        .where('id', id)
        .update({ ...newProduct })
    ) {
      return {
        ...newProduct,
        id,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function deleteProduct(id) {
  try {
    const deletedProduct = await knex('productos').where('id', id);
    if (await knex('productos').where('id', id).del()) {
      return deletedProduct;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

const Product = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};

export default Product;
