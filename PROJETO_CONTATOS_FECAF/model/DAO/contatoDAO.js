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

module.exports = {
    selectAllContatos,
};
