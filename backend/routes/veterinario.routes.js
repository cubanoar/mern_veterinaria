import express from 'express';
import {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword
} from '../controllers/veterinarioControllers.js';
import checkAuth from '../middleware/authMiddelware.js';

const router = express.Router();

//Rutas Publicas
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);

router.post('/olvide-password', olvidePassword);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);
//Cuando es la misma url y tiene get y postu otro
//router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

//Rutas privadas
router.get('/perfil',checkAuth, perfil);

export default router;
