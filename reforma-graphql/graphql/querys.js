const getProducts = `
  query getProducts {
    Products {
      title
      thumbnail
      price
      _id
    }
  }
`;

const createProduct = `
  mutation CreateProduct($title: String!, $thumbnail: String!, $price: Float!) {
    CreateProduct(title: $title, thumbnail: $thumbnail, price: $price) {
      title,
      thumbnail,
      price,
      _id
    }
  }
`;

const updateProduct = `
  mutation UpdateProduct($id: String!, $title: String!, $thumbnail: String!, $price: Float!) {
    UpdateProduct(id: $id, title: $title, thumbnail: $thumbnail, price: $price) {
      title,
      thumbnail,
      price,
      _id
    }
  }
`;

const deleteProduct = `
  mutation DeleteProduct($id: String!) {
    DeleteProduct(id: $id) {
      title
      price
      thumbnail
    }
  }
`;

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
