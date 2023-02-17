import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import generarID from '../helpers/generarUUID.js';

const veterinarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
    //Validar el nombre, solo escribimos aca, nada en el controller
    validate: {
      validator: function (value) {
        return (
          /^[a-zA-Z]{3,}( [a-zA-Z]{3,})*$/.test(value) &&
          value.length >= 3 &&
          value.length <= 50
        );
      },
      message: 'Nombre inválido',
    },
  },
  password: {
    type: String,
    required: true,
    maxLength: 8,
    minLength: 16
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    maxLength: 20,
    minLength: 10,
    required: true,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(gmail|yahoo|hotmail|outlook)\.(com|es|co.uk|com.ar)$/,
  },
  telefono: {
    type: Number,
    default: null,
    trim: true,
    max: 15
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: generarID, //Pasar solo la referencia no generarID()
  },
  confirmado: {
    type: Boolean,
    default: false,
  },
});

//HASHEAR EL PASSWORD
//Se va a ejecutar antes de guardar el registro en la BD
veterinarioSchema.pre('save', async function (next) {
  //Para que un password que ya esta hasheado no lo vuelva a hashear
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Creamos funcion que Verifica el password
veterinarioSchema.methods.comprobarPassword = async function (
  passwordFormulario
) {//Recibe el password del req.body.password y lo compara con el password hasheado en la BD
  return await bcrypt.compare(passwordFormulario, this.password);
};

//Lo registra como un modelo y  <veterinarioSchema> es la forma que van a tenet los datos
const Veterinario = mongoose.model('Veterinario', veterinarioSchema);

export default Veterinario;
