process.on('message', msg => {
  console.log('mensaje del padre', msg);
  process.send({mensaje: 'holaa'});
});