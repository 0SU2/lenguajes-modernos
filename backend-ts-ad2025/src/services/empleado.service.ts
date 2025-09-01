import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

import EmpleadoRepository from "../repositories/empleado.repository";
import EmpleadoModel from "../models/empleado.model";

dotenv.config();

export default class EmpleadoService {
  private empleadoRepository = new EmpleadoRepository();

  async createEmpleado(empleado: EmpleadoModel): Promise<string> {
    const allEmpleado = await this.empleadoRepository.getAll();
    const findEmpleado = allEmpleado.find(data => data.nombre === empleado.nombre &&
                                                  data.amaterno === empleado.amaterno &&
                                                  data.apaterno === empleado.apaterno);
    if(findEmpleado) {
      throw new Error('Ya existe el empleado');
    }
    const empleadoData = await this.empleadoRepository.getByUsuario(empleado.usuario);
    if(empleadoData) {
      throw new Error("Usuario ya existente");
    }
    empleado.password = await bcrypt.hash(empleado.password, 10);
    return await this.empleadoRepository.create(empleado);
  }

  async deleteEmpleado(id:string): Promise<void> {
    return this.empleadoRepository.delete(id);
  }

  async updateEmpleado(id: string, empleado: EmpleadoModel): Promise<void> {
    if(empleado.password) {
      empleado.password = await bcrypt.hash(empleado.password, 10);
    }
    await this.empleadoRepository.update(id, empleado);
  }

  async getAll(): Promise<EmpleadoModel[]> {
    return await this.empleadoRepository.getAll();
  }

  async login(usuario:string, password:string): Promise<string> {
    const empladoFind = await this.empleadoRepository.getByUsuario(usuario);
    if(!empladoFind) {
      throw new Error('Usuario no encontrado');
    }
    const checkPassword = await bcrypt.compare(password, empladoFind.password);
    if(!checkPassword) {
      throw new Error('Contraseña incorrecta');
    }
    return jwt.sign({
      id: empladoFind.id,
      usuario: empladoFind.usuario,
      nombre: empladoFind.nombre
    }, process.env.JWT_SECRET!, {
      expiresIn: '1h'
    });
  }
}