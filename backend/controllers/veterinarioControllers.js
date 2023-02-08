import Veterinario from '../models/Veterinario.js';

import findOneHelper from '../helpers/findOneHelper.js';
import generarJWT from '../helpers/generarJWT.js';
import generarID from '../helpers/generarUUID.js';

const registrar = async (req, res) => {
  const { email } = req.body;

  //Prevenir usuarios duplicados
  //const usuarioExiste = await Veterinario.findOne({email});
  const usuarioExiste = await findOneHelper({ email });

  if (usuarioExiste) {
    const error = new Error('Usuario existente');
    return res.status(400).json({ success: false, msg: error.message });
  }

  try {
    //Creamos la instancia de veterinario
    const veterinario = Veterinario(req.body);
    //Guardar en la BD el veterinario
    const veterinarioGuardado = await veterinario.save();

    //Pasados los 5 minutos
    setTimeout(() => {
      //Confirmar la cuenta
      veterinario.token = null;
      veterinario.save();
    }, 300000);

    res.json({ success: true, veterinarioGuardado });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const perfil = (req, res) => {
  const { veterinario } = req;

  res.json(veterinario);
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  //Buscando el token
  const usuarioConfirmar = await findOneHelper({ token });

  if (!usuarioConfirmar) {
    const error = new Error('Token no válido');
    return res.status(400).json({ success: false, msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    return res.json({ success: true, msg: 'Registrado correctamente' });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error });
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  //Comprobar si el usuario existe
  const usuario = await findOneHelper({ email });
  if (!usuario) {
    const error = new Error('El usuario no existe');
    return res.status(403).json({ success: false, msg: error.message });
  }

  //Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error('Debes confirmar tu cuenta');
    return res.status(403).json({ success: false, msg: error.message });
  }

  try {
    //Comprobar Password
    //en el modelo registramos el metodo <comprobarPassword> por eso lo usamos aca en usuario
    if (await usuario.comprobarPassword(password)) {
      //Autenticar
      //Genera un JWT con el ID
      return res
        .status(200)
        .json({ success: true, tokenJWT: generarJWT(usuario.id) });
    } else {
      const error = new Error('Usuario y/o Password incorrectos');
      return res.status(403).json({ success: false, msg: error.message });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, msg: error });
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const existeUsuario = await findOneHelper({ email });

  if (!existeUsuario) {
    const error = new Error('Usuario no encontrado');
    return res.status(404).json({ success: false, msg: error.message });
  }

  try {
    existeUsuario.token = generarID();
    existeUsuario.save();
    res.json({
      success: true,
      msg: 'Hemos enviado un email con las instrucciones',
    });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const existeUsuario = await findOneHelper({ token });

  if (existeUsuario) {
    res.json({ success: true });
  } else {
    const error = new Error('Usuario no encontrado');
    res.status(404).json({ success: false, msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinario = await findOneHelper({ token });
  if (!veterinario) {
    const error = new Error('Hubo un error');
    return res.status(400).json({ success: false, msg: error.message });
  }

  try {
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    res.json({ success: true, msg: 'Password modificado correctamente' });
  } catch (error) {
    console.log(error);
  }
};

export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
};
