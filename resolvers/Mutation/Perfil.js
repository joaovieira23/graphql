const { perfis, proximoId } = require('../../data/db');

function indicePerfil(filtro) {
  if(!filtro) return -1

  const { id, nome } = filtro

  if(id) {
    return perfis.findIndex(p => p.id === id)
  } else if(nome) {
    return perfis.findIndex(p => p.nome === nome)
  }

  return -1
}

module.exports = {
  novoPerfil(_, { dados }) {
    // const { id ,nome } = dados

    const nomeExistente = perfis.some(u => u.nome === dados.nome)

    if(nomeExistente) {
      throw new Error('Perfil já existente')
    }

    const novoPerfil = {
      id: proximoId(),
      ...dados
    }

    perfis.push(novoPerfil)
    return novoPerfil
  },

  excluirPerfil(_, { filtro }) {
    const p = indicePerfil(filtro)

    if(p < 1) return null

    const excluidos = perfis.splice(p, 1)
    return excluidos ? excluidos[0] : null
  },

  alterarPerfil(_, { dados, filtro }) {
    const p = indicePerfil(filtro)

    if(p < 1) return null
    
    perfis[p].nome = dados.nome
    
    return perfis[p]
  }
}