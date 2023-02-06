import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Separamos Bearer del token
      token = req.headers.authorization.split(' ')[1];
      //Verificamos el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Buscamos el veterinario por el id que nos trae el JWT dentro y
      //seleccionamos para que no nos traiga el password, token, confirmado
      //lo agregamos dentro de Express, y va a ir en el req que lleve este constrolador(funcion)
      req.veterinario = await Veterinario.findById(decoded.id).select(
        '-password -confirmado -token -_id'
      );

      return next();
    } catch (error) {
      const e = new Error('Token inválido');
      res.status(403).json({ success: false, msg: e.message });
      next();
    }
  }

  if (!token) {
    const error = new Error('Token inválido o inexistente');
    res.status(403).json({ success: false, msg: error.message });
  }

  next();
};

export default checkAuth;
