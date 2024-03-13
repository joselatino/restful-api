const express = require('express');
const cors = require('cors');

const routerApi = require('./routes/index');
const {logErrors, errorHandler,boomErrorHandler} = require('./middlwares/error.handler')

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.com', 'http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback)=> {
    if(whitelist.includes(origin)||!origin){
      callback(null, true);
    }else{
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta!');
})


routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



app.listen(port, () => {
  //console.log('running on port '+port);
})

