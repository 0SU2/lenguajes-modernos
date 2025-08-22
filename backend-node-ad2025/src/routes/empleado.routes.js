import express from 'express';
import empleadoController from '../controllers/empleado.controller.js';
import AuthMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', empleadoController.create);
router.put('/update/:id', AuthMiddleware, empleadoController.update);
router.delete('/delete', AuthMiddleware, empleadoController.delete);
router.get('/getAll', empleadoController.getAll);
router.post('/login', empleadoController.login);

export default router;