const Koa = require('koa');
const koaBody = require('koa-body');
const productRouter = require('./routes/product.routes.js');
const config = require('./config/config.js');

if (config.PERSISTENCE_MODE === 'Mongo') {
  require('./DB/connection.js');
}

const app = new Koa();
app.use(koaBody());

app.use(productRouter.routes()).use(productRouter.allowedMethods());

const server = app.listen(8080, () => {
  console.log(
    `Servidor inicializado en el puerto ${server.address().port} con pid ${
      process.pid
    }.`
  );
});
