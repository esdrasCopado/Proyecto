import { Router } from 'express';
import artistaController from '../controllers/ArtistaController';

const router = Router();

router.post('/', (req, res) => artistaController.create(req, res));
router.get('/', (req, res) => artistaController.findAll(req, res));
router.get('/:id', (req, res) => artistaController.findById(req, res));
router.put('/:id', (req, res) => artistaController.update(req, res));
router.delete('/:id', (req, res) => artistaController.delete(req, res));

export default router;
