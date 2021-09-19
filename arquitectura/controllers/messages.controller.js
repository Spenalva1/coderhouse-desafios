const moment = require('moment');
const persistence = require('../persistence/factory.js').getPersistence();

async function getMessages() {
  return await persistence.findAll('message');
}

async function CreateMessage(io, data) {
  const { author, message } = data;
  const newMessage = {
    author,
    message,
    date: moment(new Date()).format('DD/MM/YYY HH:mm:ss'),
  };
  await persistence.create('message', {
    author: newMessage.author,
    message: newMessage.message,
    date: newMessage.date,
  });
  io.sockets.emit('message', newMessage);
  if (message.includes('administrador')) {
    sendAdminSms(author.email, message);
  }
}

module.exports = {
  getMessages,
  CreateMessage,
};
