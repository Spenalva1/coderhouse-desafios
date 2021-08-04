import 'dotenv/config';
import express from 'express';
import httpModule from 'http';
import session from 'express-session';
import moment from 'moment';
import { Server } from 'socket.io';
import MongoStore from 'connect-mongo';
import normalizeMessages from './normalizr/messages-center.js';
import passport from './auth/passport_config.js';

import productController from './controllers/products.js';
import messagesController from './controllers/messages.js';
import { routerProductsApi, routerProductsView } from './routes/products.js';
import isLoggedIn from './auth/isLoggedIn.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

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

/* AUTH ROUTES */
app.get('/login', (req, res) => res.render('login'));

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

// app.post('/login',  (req, res, next) => {
//   passport.authenticate('login', function (err, user) {
//     console.error(err);
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.render('login', { loginError: 'Usuario o contraseña inválidos' });
//     }
//     req.logIn(user, function (err) {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect('/');
//     });
//   })(req, res, next);
// });

// app.post('/signup', (req, res, next) => {
//   passport.authenticate('signup', function (err, user) {
//     if (err) {
//       return res.render('login', { signupError: err });
//     }
//     req.logIn(user, function (err) {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect('/');
//     });
//   })(req, res, next);
// });

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

const server = http.listen(process.env.PORT || 8080, () => {
  console.log(
    `Servidor inicializado en el puerto ${process.env.PORT || 8080}.`
  );
});

server.on('error', () => {
  console.log('Error del servidor.');
});
