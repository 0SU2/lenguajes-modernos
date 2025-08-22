import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import empleadoRepository from '../repositories/empleado.repository.js';
import EmpleadoModel from '../models/empleado.modelo.js';

export default {
  async createEmpleado(data) {
    console.log(data)
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

  },

  async updateEmpleado(id, data) {
    if(data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await empleadoRepository.update(id, data);
  },

  async deleteEmpleado(id) {
    return await empleadoRepository.delete(id);
  },

  async getAll() {
    return await empleadoRepository.getAll();
  },

  async login(usuario, password) {
    const empleado = await empleadoRepository.findByUsuario(usuario);
    if(!empleado) {
      throw new Error("Usuario no encontrado");
    }

    const passwordValid = await bcrypt.compare(password, empleado.password);
    if(!passwordValid) {
      throw new Error("Contraseña invalida");
    }

    const token = jwt.sign({
      usuario: empleado.usuario,
      id: empleado.id,
      nombre: empleado.nombre
    }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    return { token }
  }

}