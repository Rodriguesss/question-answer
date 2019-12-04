const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');

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

  if(titulo == null || descricao == null){
    res.redirect('/');
  }

  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect('/');
  });
});

app.get('/pergunta/:id', (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: {id: id}
  }).then(pergunta => {
    if(pergunta != undefined){
      res.render('pergunta');
    }else{
      res.redirect('/');
    }
  });
});

app.listen(4000, (erro) => {
  if(erro){
    console.log('Houve um erro ao iniciar o servidor.');
  }else{
    console.log('Servidor iniciado.');
  }
});