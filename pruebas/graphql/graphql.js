const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const Product = require('../models/Product');

const schema = buildSchema(`
    type Query {
        Products: [Product],
        Product(id: String!): Product
    },
    type Mutation {
        CreateProduct(title: String!, thumbnail: String!, price: Float!): Product
    },
    type Product {
        id: String
        title: String
        thumbnail: String
        price: Float
    } 
`);

const getProducts = async () => await Product.find({});

const getProductById = async ({ id }) => await Product.findById(id);

const createProduct = async ({ title, thumbnail, price }) => {
  const product = new Product({ title, thumbnail, price });
  await product.save();
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
