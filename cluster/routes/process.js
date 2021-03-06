const express =  require('express');
const { fork } =  require('child_process');
const os =  require('os');

const routerProcess = express.Router();


routerProcess.get('/info', async (req, res) => {
  res.render('info',
    {
      info: [
        { key: 'Argumentos de entrada', value: process.argv.join() },
        { key: 'Nombre de la plataforma', value: process.platform },
        { key: 'Version de node.js', value: process.version },
        { key: 'Uso de memoria', value: process.memoryUsage },
        { key: 'Path de ejecución', value: process.execPath },
        { key: 'Process id', value: process.pid },
        { key: 'Carpeta corriente', value: process.cwd() },
        { key: 'Cantidad de procesadores', value: os.cpus().length },
      ]
    }
  );
});

routerProcess.get('/randoms', (req, res) => {
  const random = fork('./processes/random.js');
  random.on('message', numbers => {
    res.json(numbers);
  })
  random.send(req.query.cant || 100000000);
});

module.exports = routerProcess;