// guardar las variables globales
import { defineStore } from "pinia";
import { getEmpleados, createEmpleado, deleteEmpleado, updateEmpleado } from "@/services/empleadoService";
import router from "@/router";
import axios from "axios";
import EmpleadosPage from "@/pages/modules/EmpleadosPage.vue";


export interface EmpleadoInterface {
  id: string,
  nombre: string,
  apaterno: string,
  amaterno: string,
  direccion: string,
  telefono: string,
  ciudad: string,
  estado: string,
  email: string,
  usuario: string,
  password: string
}

interface ResponseStoreEmpleado {
  empleados: EmpleadoInterface[],
  loading: boolean
}

export const useEmpleadoStore = defineStore('empleado', {
  state: (): ResponseStoreEmpleado => ({
    empleados: [],
    loading: false,
  }),
  actions: {
    async fetchEmpleados() {
      this.loading = true;
      const {data} = await getEmpleados();
      this.$state.empleados = data.result;
      this.loading = false;
    },
    async addEmpleado(empleado: object) {
      await createEmpleado(empleado);
      await this.fetchEmpleados();
    },
    async updateEmpleado(id:any, empleado: object) {
      await updateEmpleado(id, empleado);
      await this.fetchEmpleados();
    },
    async removeEmpleado(empleado: object) {
      await deleteEmpleado(empleado)
      await this.fetchEmpleados();
    }
  }
})
