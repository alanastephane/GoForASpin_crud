const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RecomendacaoSchema = new Schema({
  nome: {
    type: String
  },
  email: {
    type: String
  },
  recomendacao: {
    type: String
  }
},{
    collection: 'recomendacao'
});

module.exports = mongoose.model('Recomendacao', RecomendacaoSchema);