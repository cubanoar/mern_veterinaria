import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
  const transporte = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  
  const { nombre, email, token } = datos;
  
  //Enviar email
  await transporte.sendMail({
    from: 'BienesRaices.com',
    to: email,
    subject: 'Confirmacion de cuenta en App Veterinaria',
    text: 'Confirmacion de cuenta en App Veterinaria',
    html: `
      <p>Hola ${nombre}</p>
      
      <p>Para confirmar tu cuenta en App Veterinaria solo debes hacerlo en el siguiente enlace: 
      <a href='${process.env.FRONTEND_URL}:${process.env.PORT ?? 5173}/confirmar-cuenta/${token}'>Confirmar Cuenta</a> </p>
      
      <p>Si no creaste una cuenta puedes ignorar este mensaje</p>
      `
  })
};

export default emailRegistro;
