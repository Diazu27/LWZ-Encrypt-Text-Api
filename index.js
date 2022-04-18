const express = require('express');
const multer  = require('multer');
var cors = require('cors');



const upload = multer();
var fs = require('fs');

//clase LWZ
const lwz= require('./Controllers/LWZalgorithm.js');


const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())


app.get('/api', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post('/api/encryptimg',upload.single('img'), (req, res) => {

  const img = req.file.buffer;
  //verifico que se subío correctamente

  if(!img){ return res.status(200).send({ message : 'Data error'})}

  //comprimo con algoritmo
  const datac= lwz.compress(img);
  
  return res.status(200).send(img)
} )


app.post('/api/encrypt',upload.none(), (req, res) => {

  const data = req.body.text;
  //verifico que se subío correctamente

  if(!data){ return res.status(200).send({ message : 'Data error'})}

  //comprimo con algoritmo
    const datac= lwz.compress(data);
  
    return res.status(200).send({compress : datac})
} )




app.post('/api/desencrypt',upload.none(), (req, res) => {

  const doc = req.body.text;
  //verifico que se subío correctamente
  if(!doc){ return res.status(200).send({ message : 'Data error'})}

  //obtengo el dato Y borro los []
  const str = doc.slice(1);
  const data = str.slice(0,-1);

  const dataArray = data.split(',').map(Number);
 
  //descomprimo
  const cont = lwz.descompress(dataArray);

  return res.status(200).send(cont)
} )






app.post('/api/desencryptimg',upload.single('doc'), (req, res) => {

  const doc = req.file.buffer;
  //verifico que se subío correctamente
  if(!doc){ return res.status(200).send({ message : 'Data error'})}

  //obtengo el dato
  const data = doc.toString()+',';

  const dataArray = data.split(',');

  //descomprimo
  const imgDes = lwz.descompress(dataArray);

  return res.status(200).send(imgDes)
} )


  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});