import { Router } from 'express';
import usuarioRouters from './usuarioRoutes';
import eventoRoutes from './eventoRoutes';
import artistaRoutes from './artistaRoutes';

const router = Router();

router.use('/usuarios', usuarioRouters);


export default router;