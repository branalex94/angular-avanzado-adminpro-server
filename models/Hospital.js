const { Schema, model } = require('mongoose')

const HospitalSchema = Schema({
    nombre: {
      type: String,
      required: true
    },
    img: {
      type: String
    },
    usuario: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  /**
   * Lo siguiente es para ponerle nombre en plural a la coleccion.
   * Esto puede ser util para nombrar colecciones en español, ya que por 
   * defecto el modelo "Hospital" se nombraria 'hospital'
   */
  // {
  //   collection: 'hospitales'
  // }
)

/**
 * Esto funciona para cambiar la configuracion de la informacion que se retorna
 * en los documentos de mongoDB.
 * En este caso se cambia el valor del campo "_id" a "uid".
 * Para fines visuales
 */
HospitalSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject()
  return object
})

module.exports = model('Hospital', HospitalSchema)
