const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const persistence = require('../persistence/factory.js').getPersistence();

const schema = buildSchema(`
    type Query {
        Products: [Product],
        Product(id: String!): Product
    },
    type Mutation {
        CreateProduct(title: String!, thumbnail: String!, price: Float!): Product
    },
    type Product {
        _id: String
        title: String
        thumbnail: String
        price: Float
    } 
`);

const getProducts = async () => await persistence.findAll('product');

const getProductById = async ({ id }) =>
  await persistence.findById('product', id);

const createProduct = async ({ title, thumbnail, price }) => {
  const product = await persistence.create('product', {
    title,
    thumbnail,
    price,
  });
  return product;
};

const root = {
  Products: getProducts,
  Product: getProductById,
  CreateProduct: createProduct,
};

module.exports = {
  graphql: graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
};
