const {
  getMessages,
  CreateMessage,
} = require('../controllers/messages.controller.js');
const {
  getProductsSocket,
  createProductSocket,
} = require('../controllers/products-socket.controller.js');
const logger = require('./logger.js');
const normalizeMessages = require('./messages-center-normalizr.js');

function setUpSockets(io) {
  io.on('connection', async (socket) => {
    logger.log('info', 'nuevo cliente conectado');

    socket.emit('products', await getProductsSocket());

    socket.emit('messages', normalizeMessages(await getMessages()));

    socket.on('productAdd', (data) => createProductSocket(io, data));

    socket.on('message', (data) => CreateMessage(io, data));
  });
}

module.exports = { setUpSockets };
