const { usuarios, proximoId } = require('../data/db');

module.exports = {
  // { nome, email, idade }
  novoUsuario(_, args) {
    const emailDuplicado = usuarios
      .some(u => u.email === args.email)
    
    if (emailDuplicado) {
      throw new Error('E-mail já cadastrado')
    }

    const novo = {
      id: proximoId(),
      ...args,
      perfil_id: 1,
      status: 'ATIVO'
    }

    usuarios.push(novo)
    return novo
  }
}