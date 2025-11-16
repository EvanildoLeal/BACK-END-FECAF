/******************************************************************************************************************************************
 * Objetivo: Funções para manipular dados de estados e cidades do Brasil
 * Data: 04/11/2025
 * Autor: Evanildo Leal
 * Versão: 1.0
 * ****************************************************************************************************************************************/

//Import do arquivo de dados de estados e cidades
const dados_estados_cidades = require("../modulo/estados_cidades.js");

//Retorna a lista de estados do Brasil
const getListEstados = function () {
  //Cria uam variavel do tipo Array
  let arrayListaDeEstados = [];

  let jsonEstados = {};

  dados_estados_cidades.listaDeEstados.estados.forEach(function (estado) {
    //Cria uma variavel do tipo JSON
    let jsonListaDeEstados = {};
    //Cria os atributos do JSON
    jsonListaDeEstados.uf = estado.sigla;
    jsonListaDeEstados.description = estado.nome;

    //Adiciona o JSON com o estado dentro do Array
    arrayListaDeEstados.push(jsonListaDeEstados);
  });

  //Padronizando a saída da função para ser sempre um JSON
  jsonEstados.estados = arrayListaDeEstados;
  jsonEstados.count = arrayListaDeEstados.length;

  return jsonEstados;
};

//Retorna a lista de cidades pelo Estado
const getListCidades = function (siglaEstado) {
  let sigla = siglaEstado;
  let arrayListCidades = [];
  let jsonListaCidades = {};
  let erro = true;

  //Tratamento para validar se o argumento foi encaminhado na função
  if (typeof sigla != "undefined" && sigla != "" && sigla.length == 2) {
    //Percorre o array de cidades para validar a sigla do estado
    dados_estados_cidades.listaDeEstados.estados.forEach((item) => {
      //localiza a sigla do estado dentro do array de cidades
      if (item.sigla.indexOf(sigla.toUpperCase()) == 0) {
        //Percorre o array da chave de cidades dentro do  estado que foi encontrado
        item.cidades.forEach((itemCidade) => {
          arrayListCidades.push(itemCidade.nome);
          erro = false;
        });

        // CORREÇÃO: Usando a variável correta e propriedades corretas
        jsonListaCidades.uf = item.sigla;
        jsonListaCidades.descricao = item.nome;
        jsonListaCidades.count = arrayListCidades.length;
        jsonListaCidades.cidades = arrayListCidades; // Nome correto da propriedade
      }
    });
  }

  if (erro) return false;
  else return jsonListaCidades; // CORREÇÃO: Retornando a variável correta
};

module.exports = {
  getListEstados,
  getListCidades,
};
