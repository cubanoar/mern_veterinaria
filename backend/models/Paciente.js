import mongoose from 'mongoose';

const pacientesSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
      match: /^[a-zA-Z]{3,}( [a-zA-Z]{3,})*$/,
    },
    propietario: {
      type: String,
      trim: true,
      required: true,
      match: /^(?!.*\d)[a-zA-ZÀ-ÖØ-öø-ÿ]{2,10}(?:\s[a-zA-ZÀ-ÖØ-öø-ÿ]{2,10}){0,3}$/
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxLength: 20,
      minLength: 10,
      required: true,
      match:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(gmail|yahoo|hotmail|outlook)\.(com|es|co.uk|com.ar)$/,
    },
    telefono: { type: Number, trim: true, required: true, maxLength: 15 },
    fecha: { type: Date, required: true, default: Date.now() },
    sintomas: {
      type: String,
      maxLength: 100,
      minLength: 3,
      match: /^[a-zA-Z0-9.,?!]+$/,
      trim: true,
      required: true,
    },
    veterinario: { type: mongoose.Schema.Types.ObjectId, ref: 'Veterinario' },
  },
  { timestamps: true }
);

const Paciente = mongoose.model('Paciente', pacientesSchema);

export default Paciente;
