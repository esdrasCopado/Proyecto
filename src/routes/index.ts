import { Router } from 'express';
import usuarioRouters from './usuarioRoutes';
import eventoRoutes from './eventoRoutes';
import organizadorRoutes from './organizadorRoutes';
import boletoRoutes from './boletoRoutes';
import ordenRoutes from './ordenRoutes';
// import artistaRoutes from './artistaRoutes';

const router = Router();

router.use('/usuarios', usuarioRouters);
router.use('/eventos', eventoRoutes);
router.use('/organizadores', organizadorRoutes);
router.use('/boletos', boletoRoutes);
router.use('/ordenes', ordenRoutes);
// router.use('/artistas', artistaRoutes); // TODO: Implementar ArtistaController

export default router;