import { Router } from 'express';
import usuarioRouters from './usuarioRoutes';
import eventoRoutes from './eventoRoutes';
import organizadorRoutes from './organizadorRoutes';
import boletoRoutes from './boletoRoutes';
import ordenRoutes from './ordenRoutes';
import artistaRoutes from './artistaRoutes';
import artistaEventoRoutes from './artistaEventoRoutes';
import albumRoutes from './albumRoutes';
import songRoutes from './songRoutes';

const router = Router();

router.use('/usuarios', usuarioRouters);
router.use('/eventos', eventoRoutes);
router.use('/eventos', artistaEventoRoutes); // Rutas de artistas en eventos
router.use('/organizadores', organizadorRoutes);
router.use('/boletos', boletoRoutes);
router.use('/ordenes', ordenRoutes);
router.use('/artistas', artistaRoutes);
router.use('/artistas', artistaEventoRoutes); // Rutas de eventos de artistas
router.use('/albums', albumRoutes);
router.use('/songs', songRoutes);

export default router;