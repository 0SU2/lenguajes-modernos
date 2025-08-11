import { db } from '../config/firebase.js';

const COLLECTION = 'empleados';

export default {
  async getAll() {
    const docEmpleados = await db.collection(COLLECTION).get();
    return docEmpleados.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async create(data) {
    const empleado = await db.collection(COLLECTION).add(data);
    return { id: empleado.id };
  },

  async update(id, data) {
    await db.collection(COLLECTION).doc(id).update(data);
    return { id: id };
  },

  async delete(id) {
    await db.collection(COLLECTION).doc(id).delete();
    return { id: id };
  },

  async findByFullName(nombre, apaterno, amaterno) {
    const empleado = await db.collection(COLLECTION)
                            .where('nombre', '==', nombre)
                            .where('apaterno', '==', apaterno)
                            .where('amaterno', '==', amaterno).get();
    return empleado.empty ? null : empleado.docs[0].data;
  },

  async findByUsuario(usuario) {
    const empleado = await db.collection(COLLECTION)
                            .where('usuario', '==', usuario).get();
    return empleado.empty ? null : empleado.docs[0].data;
  }
}