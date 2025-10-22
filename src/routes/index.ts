import { Router } from 'express';
import usuarioRouters from './usuarioRoutes';
// import eventoRoutes from './eventoRoutes';
// import artistaRoutes from './artistaRoutes';
// import organizadorRoutes from './organizadorRoutes';

const router = Router();

router.use('/usuarios', usuarioRouters);
// router.use('/eventos', eventoRoutes); // TODO: Implementar EventoController
// router.use('/artistas', artistaRoutes); // TODO: Implementar ArtistaController
// router.use('/organizadores', organizadorRoutes); // TODO: Implementar OrganizadorService

export default router;