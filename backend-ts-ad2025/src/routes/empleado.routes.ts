import { Router } from "express";
import EmpleadoController from "../controller/empleado.controller";
import { EmpleadoMiddleware } from "../middleware/empleado.middleware";

const router = Router();

router.post('/create', EmpleadoController.create);
router.put('/update/:id', EmpleadoController.update);
router.delete('/delete', EmpleadoMiddleware, EmpleadoController.delete);
router.get('/getAll', EmpleadoController.getAll);
router.post('/login', EmpleadoController.login);

export default router;