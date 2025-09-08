import { db } from "../config/firebase";
import EmpleadoModel from "../models/empleado.model";

const collection = db.collection("empleado-ts");

export default class EmpleadoRepository {
  async create (empleado: EmpleadoModel): Promise<string> {
    const { id, ...empleadoData } = empleado
    const empleadoCreate = await collection.add(empleadoData);
    return empleadoCreate.id
  }

  async update(id: string, empleado: Partial<EmpleadoModel>): Promise<void> {
    await collection.doc(id).update(empleado);
  }

  async delete(id:string): Promise<void> {
    await collection.doc(id).delete();
  }

  async getAll(): Promise<EmpleadoModel[]> {
    const empleadosDoc = await collection.get();
    return empleadosDoc.docs.map((doc) => ({id: doc.id, ...doc.data()} as EmpleadoModel))
  }

  async getByUsuario(usuario: string): Promise<EmpleadoModel| null> {
    const empleadoDoc = await collection.where("usuario", "==", usuario).get();
    return empleadoDoc.empty ? null : { id: empleadoDoc.docs[0]?.id, ...empleadoDoc.docs[0]?.data() } as EmpleadoModel
  }
}