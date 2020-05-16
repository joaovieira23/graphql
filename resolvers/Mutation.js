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
  },

  excluirUsuario(_, { id }) {
    const i = usuarios.findIndex(u => u.id === id)

    if (i < 0) return null
    
    const excluidos = usuarios.splice(i, 1)
    return excluidos ? excluidos[0] : null
  },

  alterarUsuario(_, args) {
    const i = usuarios
      .findIndex(u => u.id == args.id)
    
      if(i < 0) return null

      usuarios[i].nome = args.nome
      usuarios[i].email = args.email
      
      if(args.idade) {
        usuarios[i].idade = args.idade
      }

      // const usuario = {
      //   ...usuarios[i],
      //   ...args
      // }

      // usuarios.splice(i, 1, usuario)
      // return usuario
      
      return usuarios[i]
  }
}