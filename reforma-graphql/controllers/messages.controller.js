const moment = require('moment');
const repository = require('../repository/factory.js').getRepository();

async function getMessages() {
  return await repository.findAll();
}

async function CreateMessage(io, data) {
  const { author, message } = data;
  const newMessage = {
    author,
    message,
    date: moment(new Date()).format('DD/MM/YYY HH:mm:ss'),
  };
  await repository.create({
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
