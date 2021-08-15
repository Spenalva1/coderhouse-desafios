require('dotenv').config();
const express = require('express');
const httpModule = require('http');
const session = require('express-session');
const moment = require('moment');
const { Server } = require('socket.io');
const MongoStore = require('connect-mongo');
const cluster = require('cluster');
const os = require('os');

const normalizeMessages = require('./normalizr/messages-center.js');
const passport = require('./auth/passport_config.js');

require('./DB/connection.js');
const productController = require('./controllers/products.js');
const messagesController = require('./controllers/messages.js');
const { routerProductsApi, routerProductsView } = require('./routes/products.js');
const routerProcess = require('./routes/process.js');
const isLoggedIn = require('./auth/isLoggedIn.js');


const app = express();
const http = httpModule.Server(app);
const io = new Server(http);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
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

app.use('/api/productos', routerProductsApi);
app.use('/productos', routerProductsView);
app.use('/', routerProcess);

/* AUTH ROUTES */
app.get('/login', (req, res) => res.render('login'));

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

app.get('/logout', (req, res) => {
  const name = req.user.username;
  req.logout();
  res.render('logout', { name });
});
/* AUTH ROUTES */

/* INDEX ROUTE */
app.get('/', isLoggedIn, async (req, res) => {
  res.render('index', {
    name: req.user?.username,
    email: req.user?.email,
    photo: req.user?.photo,
  });
});
/* INDEX ROUTE */

/* SOCKETS */
io.on('connection', async (socket) => {
  console.log('nuevo cliente conectado');

  socket.emit('products', await productController.findAll());

  socket.emit(
    'messages',
    normalizeMessages(await messagesController.findAll())
  );

  socket.on('productAdd', async (data) => {
    const { title, price, thumbnail } = data;
    const newProduct = await productController.create({
      title,
      price,
      thumbnail,
    });
    io.sockets.emit('product', newProduct);
  });

  socket.on('message', async (data) => {
    const { author, message } = data;
    const newMessage = {
      author,
      message,
      date: moment(new Date()).format('DD/MM/YYY HH:mm:ss'),
    };
    await messagesController.create({
      author: newMessage.author,
      message: newMessage.message,
      date: newMessage.date,
    });
    io.sockets.emit('message', newMessage);
  });
});
/* SOCKETS */

const mode = process.argv[5]?.toUpperCase() || 'FORK';

if (mode === 'FORK') {
  const server = http.listen(process.argv[2] || process.env.PORT || 8080, () => {
    console.log(
      `Servidor inicializado en el puerto ${server.address().port}.`
    );
  });

  server.on('error', () => {
    console.log('Error del servidor.');
  });

  process.on('exit', code => {
    console.log('Exit code -> ', code)
  })
}

if (mode === 'CLUSTER') {
  if (cluster.isMaster) {
    for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    })
  } else {
    const server = http.listen(process.argv[2] || process.env.PORT || 8080, () => {
      console.log(
        `Servidor inicializado en el puerto ${server.address().port}.`
      );
    });

    server.on('error', () => {
      console.log('Error del servidor.');
    });

    process.on('exit', code => {
      console.log('Exit code -> ', code)
    })
  }
}