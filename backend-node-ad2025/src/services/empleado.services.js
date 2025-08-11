import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import empleadoRepository from '../repositories/empleado.repository.js';
import EmpleadoModel from '../models/empleado.modelo.js';

export default {
  async createEmpleado(data) {
    const { nombre, apaterno, amaterno, usuario, password } = data;

    const nombreDuplicado = await empleadoRepository.findByFullName(nombre, apaterno, apaterno);
    if(nombreDuplicado) {
      throw new Error('Ya existe alguien con ese nombre');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const empleadoNuevo = new EmpleadoModel({
      ...data,
      password: hashedPassword
    });

    return await empleadoRepository.create({ ...empleadoNuevo });

  }
}