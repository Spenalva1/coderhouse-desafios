import mongoose from '../DB/connection.js'

const schema = mongoose.Schema({
  author: { type: String, require: true, max: 100 },
  message: { type: String, require: true },
  date: { type: String, require: true, max: 50 }
});

const Message = mongoose.model('messages', schema);

export default Message;

// function start() {
//   knex = Knex({
//     client: 'sqlite3',
//     connection: {
//       filename: __dirname + '/DB/mensajes.sqlite'
//     },
//     useNullAsDefault: false
//   });

//   knex.schema.hasTable('mensajes').then((exists) => {
//     if (!exists) {
//       return knex.schema.createTable('mensajes', (t) => {
//         t.increments('id').primary();
//         t.string('author', 100);
//         t.string('message', 500);
//         t.float('date');
//       });
//     }
//   });
// }


// async function addMessage(author, message, date) {
//   try {
//     const newMessage = { author, message, date };
//     await knex('mensajes').insert(newMessage);
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function read() {
//   try {
//     const messages = await knex.select().table('mensajes');
//     return messages?.length ? messages : [];
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

// const Chat = {
//   start,
//   addMessage,
//   read,
// };

// export default Chat;