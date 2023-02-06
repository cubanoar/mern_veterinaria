import jwt from 'jsonwebtoken';

const generarJWT = (id) => {
  //nos crea un nuevo jwt, recibe un objeto con la info que se va agregar al JWT, NO PONER INFO SENSIBLE
  //En este recibe el id del usuario y nos va a permitir identificar el usuario en la base de datos
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generarJWT;
