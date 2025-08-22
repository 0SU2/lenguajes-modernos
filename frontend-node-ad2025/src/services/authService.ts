import axios from "axios";
const PORT= 6969

const api = axios.create({
  baseURL: `http://localhost:${PORT}/empleados`
});

export const loginRequest = async(data:object) => {
  const res = await api.post('/login', data);
  return res.data
}

export const registerRequest = async(data:any) => {
  console.log(`Cambia eso de ${data} desde register`);
  const res = await api.post('/create', data);
  return res.data
}