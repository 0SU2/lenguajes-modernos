import express from 'express';
const router = express.Router();
import { getUsuarios, addUsuario, updateUsuario, deleteUsuario } from './../controllers/usuario.controller.js';

router.get('/' , getUsuarios);
router.post('/' , addUsuario);
router.put('/:id' , deleteUsuario);
router.delete('/:id' , deleteUsuario);

export default router;