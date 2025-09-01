import axios from "axios";

const PORT= 6969

const api = axios.create({
  baseURL: `http://localhost:${PORT}/empleados`
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config
})

export const getEmpleados = async() => {
  return api.get('/getAll');
}

export const createEmpleado = async(data:object) => {
  return api.put('/create', data);
}

export const updateEmpleado = async(id:any, data:object) => {
  return api.put(`/update/${id}`, data);
  // throw new Error(`Arregla tu tonteria de ${data} y ponle interfaz en updateEmpleado, naco`);
}

export const deleteEmpleado = async(id:any) => {
  return api.delete(`/update/${id}`);
  // throw new Error(`Arregla tu tonteria de ${data} y ponle interfaz en deleteEmpleado, naco`);
}