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
  let jsonContatos = {};
  let dadosContatos = await contatoDAO.selectAllContatos();

  if (dadosContatos) {
    jsonContatos.count = dadosContatos.length;
    jsonContatos.contatos = dadosContatos;
    return jsonContatos;
  } else {
    return false;
  }
};

//Insere um novo contato no BD
const setNewContato = async function (contato) {
  if (
    contato.nome == "" ||
    contato.nome == undefined ||
    contato.cpf == "" ||
    contato.cpf == undefined ||
    contato.email == "" ||
    contato.email == undefined
  ) {
    return false;
  } else {
    let result = await contatoDAO.insertContato(contato);
    return result;
  }
};

//Atualizar um contato existente
const setUpdateContato = async function (contato, idContato) {
  if (
    contato.nome == "" ||
    contato.nome == undefined ||
    contato.cpf == "" ||
    contato.cpf == undefined ||
    contato.email == "" ||
    contato.email == undefined ||
    idContato == "" ||
    idContato == undefined
  ) {
    return false;
  } else {
    let result = await contatoDAO.updateContato(contato, idContato);
    return result;
  }
};

//Excluir contato no BD
const setDeleteContato = async function(id) {
  
  if (id == "" || id == undefined) {
    return false;
  } else {
    let result = await contatoDAO.deleteContato(id);
    if (result) {
      return true;
    } else {
      return false;
    }

  }   
};


 module.exports = {
    getContatos,
    setNewContato,
    setUpdateContato,
    setDeleteContato
};