import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) => {
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
    subject: 'Reestablece tú password',
    text: 'Reestablece tú password',
    html: `
      <p>Hola ${nombre}</p>
      
      <p>Para reestablecer tú password en App Veterinaria solo debes hacerlo en el siguiente enlace: 
      <a href='${process.env.FRONTEND_URL}:${process.env.PORT ?? 5173}/olvide-password/${token}'>Reestablece tú password</a> </p>
      
      <p>Si no pediste reestablecer tú password, puedes ignorar este mensaje</p>
      `
  })
};

export default emailOlvidePassword;
