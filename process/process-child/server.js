import express from 'express';
import  {getRandomNumbers} from './random.js';

const app = express();

app.get('/', (req, res) => {
  res.send('hola!')
})


app.get('/randoms', (req, res) => {
  const numbers = getRandomNumbers(req.query.cant || 100000000);
  res.json(numbers);
  // const random = fork('./random.js');
  // random.on('message', numbers => {
  //   res.json(numbers);
  // })
  // random.send(req.query.cant || 100000000);
})

const PORT = parseInt(process.argv[2]) || 8080;

const server = app.listen(PORT, () => {
  console.log(
    `Servidor inicializado en el puerto ${server.address().port}.`
  );
});