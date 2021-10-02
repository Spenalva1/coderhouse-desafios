const express = require('express');
const httpModule = require('http');
const session = require('express-session');
const compression = require('compression');
const { Server } = require('socket.io');
const MongoStore = require('connect-mongo');
const cluster = require('cluster');
const os = require('os');

const { setUpSockets } = require('./lib/socketsIo.js');
const logger = require('./lib/logger.js');
const { passport } = require('./middlewares/passport_config.js');
const { graphql } = require('./graphql/graphql.js');

require('./DB/connection.js');
const {
  routerProductsApi,
  routerProductsView,
} = require('./routes/products.routes.js');
const routerProcess = require('./routes/process.routes.js');
const routerAuth = require('./routes/auth.routes.js');
const routerIndex = require('./routes/index.routes.js');
const { MONGO_URL, CLUSTER_MODE, PORT } = require('./config/config.js');

const app = express();
const http = httpModule.Server(app);
const io = new Server(http);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: 'coderhouse',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 10 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

/* ROUTES */
app.use('/api/productos', routerProductsApi);
app.use('/productos', routerProductsView);
app.use('/', routerProcess);
app.use('/', routerAuth);
app.use('/', routerIndex);
app.use('/graphql', graphql);
/* ROUTES */

/* SOCKETS */
setUpSockets(io);
/* SOCKETS */

const mode = CLUSTER_MODE || 'FORK';

if (mode === 'FORK') {
  const server = http.listen(PORT || 8080, () => {
    logger.log(
      'info',
      `Servidor inicializado en el puerto ${server.address().port} con pid ${
        process.pid
      }.`
    );
  });

  server.on('error', (err) => {
    logger.log('error', 'Error del servidor.' + err);
  });

  process.on('exit', (code) => {
    logger.log('info', 'Exit code -> ' + code);
  });
}

if (mode === 'CLUSTER') {
  if (cluster.isMaster) {
    for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      logger.log('warn', `worker ${worker.process.pid} died`);
    });
  } else {
    const server = http.listen(PORT, () => {
      logger.log(
        'info',
        `Servidor inicializado en el puerto ${server.address().port} con pid ${
          process.pid
        }.`
      );
    });

    server.on('error', () => {
      logger.log('error', 'Error del servidor.' + err);
    });

    process.on('exit', (code) => {
      logger.log('info', 'Exit code -> ' + code);
    });
  }
}
