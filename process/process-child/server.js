const express = require('express');
const { fork } = require('child_process');

const app = express();

app.get('/', (req, res) => {
  res.send('hola!')
})


app.get('/randoms', (req, res) => {
  const random = fork('./random.js');
  random.on('message', numbers => {
    res.json(numbers);
  })
  random.send(req.query.cant || 100000000);
})


const server = app.listen(process.argv[2] || process.env.PORT || 8080, () => {
  console.log(
    `Servidor inicializado en el puerto ${server.address().port}.`
  );
});