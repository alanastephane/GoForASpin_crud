const express = require('express');
const app = express();
const recomendacaoRoutes = express.Router();

let Recomendacao = require('../model/Recomendacao');

// api to add recomendacoes
recomendacaoRoutes.route('/add').post(function (req, res) {
  let recomendacao = new Recomendacao(req.body);
  recomendacao.save()
  .then(recomendacao => {
    res.status(200).json({'status': 'success','mssg': 'recomendacao added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get recomendacoes
recomendacaoRoutes.route('/').get(function (req, res) {
  Recomendacao.find(function (err, recomendacoes){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','recomendacoes': recomendacoes});
    }
  });
});

// api to get recomendacao
recomendacaoRoutes.route('/recomendacao/:id').get(function (req, res) {
  let id = req.params.id;
  Recomendacao.findById(id, function (err, recomendacao){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','recomendacao': recomendacao});
    }
  });
});

// api to update route
recomendacaoRoutes.route('/update/:id').put(function (req, res) {
    Recomendacao.findById(req.params.id, function(err, recomendacao) {
    if (!recomendacao){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
      recomendacao.nome = req.body.name;
      recomendacao.email = req.body.email;
      recomendacao.recomendacao = req.body.recomendacao;

      recomendacao.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
recomendacaoRoutes.route('/delete/:id').delete(function (req, res) {
  Recomendacao.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = recomendacaoRoutes;