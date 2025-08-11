export default class EmpleadoInterface {
  constructor({
    nombre, apaterno, amaterno, direccion, telefono, ciudad, estado, email, usuario, password
  }) {
    this.nombre = nombre
    this.apaterno = apaterno
    this.amaterno = amaterno
    this.direccion = direccion
    this.telefono = telefono
    this.ciudad = ciudad
    this.estado = estado
    this.email = email
    this.usuario = usuario
    this.password = password
  }
}