export type Empleado = {
  id       : string
  nombre   : string
  apaterno : string
  amaterno : string
  direccion: string
  telefono : string
  ciudad   : string
  estado   : string
  usuario  : string
  rol      : string
  [k       : string ]: any
}

export type CreateEmpleadoDto = {
  nombre   : string
  apaterno : string
  amaterno : string
  direccion: string
  telefono : string
  ciudad   : string
  estado   : string
  usuario  : string
  password : string
  rol      : string
}

export type UpdateEmpleado = Partial<Omit<CreateEmpleadoDto, 'Password'>> & { password?: string }