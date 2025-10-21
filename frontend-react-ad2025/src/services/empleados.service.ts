import { api } from "./api";
import type { CreateEmpleadoDto, Empleado, UpdateEmpleado } from "../types/empleado";

export const empleadosService = {
  async getAll(): Promise<Empleado[]> {
    const { data } = await api.get('/empleados/getall');
    if (!data.ok) {
      throw new Error(data?.message || 'Error al cargar empleados');
    }
    return data.result as Empleado[];
  },
  async create(payload: CreateEmpleadoDto) {
    const { data } = await api.post('/empleados/create', payload);
    if (!data.ok) {
      throw new Error(data?.message || 'Error al crear el empleado');
    }
    return data.result;
  },
  async update(id: string, payload: UpdateEmpleado) {
    const { data } = await api.put(`/empleados/update/${id}`, payload);
    if (!data.ok) {
      throw new Error(data?.message || 'Error al actualizar el empleado');
    }
    return data.result;
  },
  async delete(id: string) {
    const { data } = await api.delete(`/empleados/delete/${id}`);
    if (!data.ok) {
      throw new Error(data?.message || 'Error al borrar el empleado');
    }
    return data.result;
  }
}
