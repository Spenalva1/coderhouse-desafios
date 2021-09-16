const moment = require('moment');
const Message = require('../models/Message.js');

async function getMessages() {
  return await Message.find({});
}

async function CreateMessage(io, data) {
  const { author, message } = data;
  const newMessage = {
    author,
    message,
    date: moment(new Date()).format('DD/MM/YYY HH:mm:ss'),
  };
  await Message.create({
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
