const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const ProductDAO = require('../dao/factory.js').getDAO();

const schema = buildSchema(`
    type Query {
        Products: [Product],
        Product(id: String!): Product
    },
    type Mutation {
        CreateProduct(title: String!, thumbnail: String!, price: Float!): Product,
        UpdateProduct(id: String!, title: String!, thumbnail: String!, price: Float!): Product,
        DeleteProduct(id: String!): Product
    },
    type Product {
        _id: String
        title: String
        thumbnail: String
        price: Float
    } 
`);

const getProducts = async () => await ProductDAO.findAll();

const getProductById = async ({ id }) => await ProductDAO.findById(id);

const createProduct = async ({ title, thumbnail, price }) => {
  const product = await ProductDAO.create({
    title,
    thumbnail,
    price,
  });
  return product;
};

const updateProduct = async ({ id, title, thumbnail, price }) => {
  const product = await ProductDAO.update(id, {
    title,
    price,
    thumbnail,
  });
  return product;
};

const deleteProduct = async ({ id }) => {
  return await ProductDAO.delete(id);
};

const root = {
  Products: getProducts,
  Product: getProductById,
  CreateProduct: createProduct,
  UpdateProduct: updateProduct,
  DeleteProduct: deleteProduct,
};

module.exports = {
  graphql: graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
};
