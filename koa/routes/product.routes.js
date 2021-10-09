const ProductController = require('../controllers/ProductController.js');
const Router = require('@koa/router');

const productRouter = new Router();

productRouter.prefix('/api/productos');

/* API */
productRouter.get('/listar', ProductController.listProducts);

productRouter.get('/listar/:id', ProductController.getProduct);

productRouter.post('/guardar', ProductController.createProduct);

productRouter.put('/actualizar/:id', ProductController.updateProduct);

productRouter.delete('/borrar/:id', ProductController.deleteProduct);
/* API */

module.exports = productRouter;
