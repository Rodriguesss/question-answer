const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

connection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com o banco de dados!');
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  Pergunta.findAll({ raw: true, order:[
    ['id','desc']
  ]}).then(perguntas => {
    res.render('index', {
      perguntas: perguntas
    });
  });
});

app.get('/perguntar', (req, res) => {
  res.render('perguntar');
});

app.post("/salvarPergunta", (req, res) =>{

  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  if(titulo == undefined || descricao == undefined){
    res.redirect('/');
  }else{
    Pergunta.create({
      titulo: titulo,
      descricao: descricao
    }).then(() => {
      res.redirect('/');
    });
  }
});

app.get('/pergunta/:id', (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: {id: id}
  }).then(pergunta => {
    if(pergunta != undefined){

      Resposta.findAll({
        where: { perguntaId: pergunta.id},
        order: [
          ['id', 'desc']
        ]
      }).then(respostas =>{
        res.render('pergunta', {
          pergunta: pergunta,
          respostas: respostas
        })
      })
    }else{
      res.redirect('/');
    }
  });
});

app.post('/salvarResposta', (req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.perguntaId;

  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
    res.redirect('/pergunta/'+perguntaId)
  });
});

app.listen(4000, (erro) => {
  if(erro){
    console.log('Houve um erro ao iniciar o servidor.');
  }else{
    console.log('Servidor iniciado.');
  }
});