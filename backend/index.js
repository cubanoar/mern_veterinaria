import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import veterinarioRouter from './routes/veterinario.routes.js';
import pacienteRouter from './routes/paciente.routes.js';

const app = express();
//Para leer JSON
app.use(express.json());

//Para las Variables de entorno
dotenv.config();

conectarDB();

app.use('/api/veterinarios', veterinarioRouter);
app.use('/api/pacientes', pacienteRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, (req, res) => {
  console.log(`🚀 Server run in port: ${PORT} 🚀`);
});
