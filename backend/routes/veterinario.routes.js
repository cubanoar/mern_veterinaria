import express from 'express';
import {
  registrar,
  perfil,
  confirmar,
  autenticar,
} from '../controllers/veterinarioControllers.js';
import checkAuth from '../middleware/authMiddelware.js';

const router = express.Router();

//Rutas Publicas
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);

//Rutas privadas
router.get('/perfil',checkAuth, perfil);

export default router;
