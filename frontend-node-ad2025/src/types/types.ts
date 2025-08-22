export interface UserInterface {
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

export interface BackendResponseInterface {
  token: string,
  message: string
}