import type { EmpleadoInterface } from "../interfaces/empleado.interface";

export default class EmpleadoModel implements EmpleadoInterface {
  id?: string;
  nombre: string;
  apaterno: string;
  amaterno: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  estado: string;
  email: string;
  usuario: string;
  password: string;

  constructor(infoConstructor: EmpleadoInterface) {
    this.id = infoConstructor.id ? infoConstructor.id : "";
    this.nombre = infoConstructor.nombre;
    this.amaterno = infoConstructor.amaterno;
    this.apaterno = infoConstructor.apaterno;
    this.direccion = infoConstructor.direccion;
    this.telefono = infoConstructor.telefono;
    this.ciudad = infoConstructor.ciudad;
    this.estado = infoConstructor.email;
    this.email = infoConstructor.email;
    this.usuario = infoConstructor.usuario;
    this.password = infoConstructor.password;
  }
}