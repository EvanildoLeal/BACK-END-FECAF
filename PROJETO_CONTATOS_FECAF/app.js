/*****************************************************************
 * Objetivo: API para realizar requisição de contatos da UniFECAF
 * Data:17/11/2025
 * Autor: Evanildo Leal
 * Versão: 1.0
 *******************************************************************/
/*
    MVC - (MODEL, VIEW, CONTROLLER)

    Model - Modelagem dos dados (MD)Banco de Dados)
    Controller - É responsável pela Regra de Negócio do Projeto
    View - É responsável pela interação com o cliente(usuário) (Interface Gráfica)

    Dependências para acesso ao banco de dados
    - Sequelize
    - Prisma
    - Fastfy

    Instalação e configuração do Prisma
        npm install prisma --save
        npx prisma init
        npm install @prisma/client

*/

//Import das dependências do projeto
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Criando um objeto do tipo express
const app = express();

app.use((request, response, next) => {
  //Configuração de quem poderá acessar a API (IP OU * todos)
  response.header('Access-Control-Allow-Origin', '*');

  //Configuração de quais métodos serão aceitos na API
  response.header(
    'Access-Control-Allow-Methods',
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS'
  );

  app.use(cors());
  next();
});

const controllerContatos = require('./controller/controllerContato.js');

//Endpoints -> Será um GET para retornar todos os contatos do BD

app.get('/v1/fecaf/contatos', cors(), async function (request, response, next) {
   
  let dadosContato = await controllerContatos.getContatos();

  if (dadosContato) {
      response.status(200);
      response.json(dadosContato);
  } else {
      response.status(404);
  }
});

// É obrigatório para fazer a API ficar aguardando ou escutando novas requisições
app.listen(8080, function () {
  console.log("API funcionando e aguardando novas Requisições...");
});
