<?php
 class Empleado {
  public $id;
  public $nombre;
  public $apaterno;
  public $amaterno;
  public $direccion;
  public $telefono;
  public $ciudad;
  public $estado;
  public $usuario;
  public $password;
  public $rol;
  public $created_at;

  public function __construct($row = []) {
    foreach($row as $k => $v) {
      if (property_exists($this, $k)) {
        $this->$k = $v;
      }
    }
  }

  public function toPublic() {
    return [
      'id'         => $this->id,
      'nombre'     => $this->nombre,
      'apaterno'   => $this->apaterno,
      'amaterno'   => $this->amaterno,
      'direccion'  => $this->direccion,
      'telefono'   => $this->telefono,
      'ciudad'     => $this->ciudad,
      'estado'     => $this->estado,
      'usuario'    => $this->usuario,
      'password'   => $this->password,
      'rol'        => $this->rol,
      'created_at' => $this->created_at,
    ];
  }
 }