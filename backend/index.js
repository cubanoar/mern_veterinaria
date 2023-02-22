import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import veterinarioRouter from './routes/veterinario.routes.js';
import pacienteRouter from './routes/paciente.routes.js';

const app = express();
//Para leer JSON
app.use(express.json());

//Para las Variables de entorno
dotenv.config();

//Habilitando CORS
const dominiosPermitidos = ['http://localhost:5173','https://mailtrap.io'];
const corsOptions = {
  origin: function(origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      //El origin esta permitido
      callback(null,true);
    }else{
      callback(new Error('No permitido por CORS'));
    }
  }
}
app.use(cors(corsOptions));

conectarDB();

app.use('/api/veterinarios', veterinarioRouter);
app.use('/api/pacientes', pacienteRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, (req, res) => {
  console.log(`🚀 Server run in port: ${PORT} 🚀`);
});
