import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import generarID from '../helpers/generarUUID.js';

const veterinarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  telefono: {
    type: String,
    default: null,
    trim: true,
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
