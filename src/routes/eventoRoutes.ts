import { Router } from 'express';
import { EventoController } from '../controllers/EventoController';

const router = Router();
const eventoController = new EventoController();

router.post('/', (req, res) => eventoController.create(req, res));
router.get('/', (req, res) => eventoController.findAll(req, res));
router.get('/:id', (req, res) => eventoController.findById(req, res));
router.put('/:id', (req, res) => eventoController.update(req, res));
router.delete('/:id', (req, res) => eventoController.delete(req, res));

export default router;