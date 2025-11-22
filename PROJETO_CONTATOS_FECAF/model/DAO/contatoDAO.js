/*****************************************************************
 * Objetivo: Arquivo responsável pela manipulação do Banco de Dados
 * Data:18/11/2025
 * Autor: Evanildo Leal
 * Versão: 1.0
 ********************************************************************/

//Import Prisma Client
const { PrismaClient } = require('@prisma/client');

//Instancia do objeto PrismaClient
const prisma = new PrismaClient();

//Retorna todos os contatos do BD
const selectAllContatos = async function () {
  let sql = 'select * from tbl_contatos';

  //Executa no BD o script SQL de Select
  let rsContatos = await prisma.$queryRawUnsafe(sql);
  if (rsContatos.length > 0)
      return rsContatos;
  else 
      return false;
  
}

// contatoDAO.js - Função insertContato
const insertContato = async function (contato) {
  
  let sql = `insert into tbl_contatos(nome, cpf, email) values('${contato.nome}', '${contato.cpf}', '${contato.email}')`; // Removi vírgula extra

  let result = await prisma.$executeRawUnsafe(sql);

  if (result) return true;
  else return false;
};

const updateContato = async function (contato, id) {
    let sql = `update tbl_contatos set
        nome = '${contato.nome}',
        cpf  = '${contato.cpf}',
        email = '${contato.email}' 
        where id = ${id}`; 

  let result = await prisma.$executeRawUnsafe(sql);

    if (result)
        return true;
    else
        return false;
};

const deleteContato = async function (id) {
    let sql = `delete from tbl_contatos where id = ${id}`; 

    let result = await prisma.$executeRawUnsafe(sql);

    if (result)
        return true;
    else
        return false;
};

module.exports = {
  selectAllContatos,
  insertContato,
  updateContato,
  deleteContato,
};
