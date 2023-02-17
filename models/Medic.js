const { Schema, model } = require('mongoose')

const MedicSchema = Schema({
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
    },
    hospital: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Hospital'
    }
  }
)

/**
 * Esto funciona para cambiar la configuracion de la informacion que se retorna
 * en los documentos de mongoDB.
 * En este caso se cambia el valor del campo "_id" a "uid".
 * Para fines visuales
 */
// MedicSchema.method('toJSON', function () {
//   const { __v, ...object } = this.toObject()
//   return object
// })

module.exports = model('Medic', MedicSchema)
