const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mean').then(
  () => console.log('Database is connected'),
  err => console.log('Cannot connect to the database' + err)
);

const recomendacaoRoute = require('./routes/recomendacao.route');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/recomendacao', recomendacaoRoute);

app.get('/', function(req, res){
   res.send("Hello World!");
});

app.listen(3000, function () {
    console.log('Server is listening on http://localhost:3000');
});