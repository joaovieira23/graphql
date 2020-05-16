const usuario = require('./Usuario')
const perfil = require('./Perfil')

module.exports = {
  ...usuario,
  ...perfil,
}