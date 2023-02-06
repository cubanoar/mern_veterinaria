import Veterinario from '../models/Veterinario.js';

async function findOneHelper(datos) {
  try {
    const usuarioExiste = await Veterinario.findOne(datos);
    return usuarioExiste;
  } catch (error) {
    console.log(error);
  }
}

export default findOneHelper;
