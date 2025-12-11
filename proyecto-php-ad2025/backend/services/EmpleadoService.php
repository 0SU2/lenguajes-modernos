<?php
  require_once __DIR__ . '/../repositories/EmpleadoRepository.php';
  require_once __DIR__ . '/../utils/Password.php';
  class EmpleadoService {
    private $repo;

    public function __construct() {
      $this->repo = new EmpleadoRepository();
    }

    public function listAll() {
      $lista = $this->repo->getAll();
      return array_map(fn($e) => $e->toPublic(), $lista);
    }

    public function createEmpleado($data) {
      if (empty($data['nombre']) || empty($data['apaterno']) || empty($data['usuario']) || empty($data['password'])) {
        return [false, "Faltan campos obligatorios"];
      }

      $existe = $this->repo->getByUsuario($data['usuario']);
      if ($existe) {
        return [false, "El usuario ya existe"];
      }

      $data['password'] = Password::hash($data['password']);
      $nuevo = $this->repo->create($data);
      return [true, $nuevo->toPublic()];
    }

    public function deleteEmpleado($id) {
      $ok = $this->repo->delete($id);
      return $ok ? [ true, "Empleado Eliminado" ] : [ false, "Empleado no encontrado" ];
    }

    public function updateEmpleado($id, $data) {
      if (isset($data['password']) && $data['password'] !== '') {
        $data['password'] = Password::hash($data['password']);
      } else {
        unset($data['password']);
      }
      $actualizado = $this->repo->update($id, $data);
      if(!$actualizado) {
        return [false, "No se puede actualizar"];
      }
      return [true, $actualizado->toPublic()];
    }
  }