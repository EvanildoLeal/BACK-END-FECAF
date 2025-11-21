/*****************************************************************
 * Objetivo: Arquivo responsável pela manipulação do Banco de Dados
 * Data:18/11/2025
 * Autor: Evanildo Leal
 * Versão: 1.0
 ********************************************************************/

//Import do arquivo de dados
const contatoDAO = require("../model/DAO/contatoDAO.js");

//Retorna todos os contatos do BD
const getContatos = async function () {
  //Cria um objeto do tipo JSON
  let jsonContatos = {};

  //Solicita os dados do BD na model
  let dadosContatos = await contatoDAO.selectAllContatos();

  //Valida o retorno dos dados
  if (dadosContatos) {
    jsonContatos.cont = dadosContatos.length;
    jsonContatos.contatos = dadosContatos;
    return jsonContatos;
  } else {
    return false;
  }
};

module.exports = {
  getContatos,
};
