const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index')
})

app.get('/perguntar', (req, res) => {
  res.render('perguntar');
});

app.listen(4000, (erro) => {
  if(erro){
    console.log('Houve um erro ao iniciar o servidor.');
  }else{
    console.log('Servidor iniciado.');
  }
});