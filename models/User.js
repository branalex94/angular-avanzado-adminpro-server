const { Schema, model } = require('mongoose')

const UserSchema = Schema({
	nombre: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	img: {
		type: String
	},
	role: {
		type: String,
		required: true,
		default: 'USER_ROLE'
	},
	google: {
		type: Boolean,
		default: false
	}
})

/**
 * Esto funciona para cambiar la configuracion de la informacion que se retorna
 * en los documentos de mongoDB.
 * En este caso se cambia el valor del campo "_id" a "uid".
 * Para fines visuales
 */
// UserSchema.method('toJSON', function() {
// 	const { __v, _id, ...object } = this.toObject()
// 	object.uid = _id;
// 	return object;
// })

module.exports = model('User', UserSchema)
