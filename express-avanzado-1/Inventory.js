export default class Inventory {
  constructor() {
    this.products = [];
    this.id = 0
  }

  getProducts() {
    return this.products;
  }

  getProduct(id) {
    return this.products.find(product => product.id == id);
  }

  addProduct(title, price, thumbnail) {
    const newProduct = {title, price, thumbnail, id: this.id};
    this.products.push(newProduct);
    this.id++;
    return newProduct;
  }
}