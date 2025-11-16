/*********************************************************************************************************************************
 * Objetivo: API->aplication programming interface - responsável pela saída de dados de estados e cidades do Brasil
 * Data: 11/11/2025
 * Autor: Evanildo Leal
 * Versão: 1.0
 ********************************************************************************************************************************/

/*
    Para criar uma API, precisamos instalar:
        express     - npm install express --save
        cors        - npm install cors --save
        body-parser - npm install body-parser --save
        npm install express cors body-parser --save
*/

//Import das dependências do projeto
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Criando um objeto do tipo express
const app = express();

//Definindo as permissões do CORS
//request -> chegará na API
//response -> retorno da API

// 02 modelos de API's
// Privadas-> API's internas (particulares) das empresas
// Públicas -> API's externas, geralmente livres para utilização

app.use((request, response, next) => {
    //Configuração de quem poderá acessar a API (IP OU * todos)
    response.header('Access-Control-Allow-Origin', '*');
    //Configuração de quais métodos serão aceitos na API
    response.header('Access-Control-Allow-Methods', 'GET');

    app.use(cors());
    next();

})

//EndPoints -> Pontos de escuta da API # ponto de parada aonde  minha API vai executar alguma coisa
//Endpoint: GET: listar os estados.
app.get('/estados', cors(), async function (request, response, next) {
    
    //Import do arquivo de funções
    let controllerEstados = require('./controller/controller_estados_cidades.js');

    //Solicita a lista de estados para a função
    let estados = controllerEstados.getListEstados();
    
    //Define o que a API deverá retornar
    if (estados) {
        response.status(200);
        response.json(estados);
    } else {
        response.status(404);
    }

   
});

//Endpoint : GET: listar as cidades de um estados.
app.get('/cidades/estado/:uf', cors(), async function (request, response, next) {

    let siglaEstado = request.params.uf;
    
    //Import do arquivo de funções
    let controllerEstados = require('./controller/controller_estados_cidades.js');

    //Solicita a lista de estados para a função
    let estados = controllerEstados.getListCidades(siglaEstado);
    
    //Define o que a API deverá retornar
    if (estados) {
        response.status(200);
        response.json(estados);
    } else {
        response.status(404);
    }

   
});
 
// É obrigatório para fazer a API ficar aguardando ou escutando novas requisições
app.listen(8080, function () { 
    console.log('API funcionando e aguardando novas Requisições...');
});