import type { Request, Response,  } from "express";
import EmpleadoService from "../services/empleado.service";
import EmpleadoModel from "../models/empleado.model";
import type { EmpleadoInterface } from "../interfaces/empleado.interface";

const empleadoService = new EmpleadoService();

export default class EmpleadoController {
  static async create(req: Request, res: Response) {
    try {
      const empleado = new EmpleadoModel(req.body as EmpleadoInterface);
      const id = await empleadoService.createEmpleado(empleado);
      res.status(201).json({
        id: id
      })
    } catch (error) {
      return res.status(400).json({
        error
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      await empleadoService.updateEmpleado(req.params.id as string, req.body)
      res.status(201).json({
        message: 'Actualizado susesfuli'
      })
    } catch (error) {
      return res.status(400).json({
        error
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await empleadoService.deleteEmpleado(req.params.id as string)
      res.status(201).json({
        message: 'Borrado susesfuli'
      })
    } catch (error) {
      return res.status(400).json({
        error
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    const empleados = await empleadoService.getAll();
    res.json(empleados);
  }

  static async login(req: Request, res: Response) {
    try {
      const { usuario, password } = req.body
      const token = await empleadoService.login(usuario, password);
      res.json({ token });
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        error
      })
    }
  }
}