<?php
  require_once __DIR__ . '/../config/db.php';
  require_once __DIR__ . '/../models/Empleado.php';

  class EmpleadoRepository {
    public function getAll() {
      $pdo = getPDO();
      $query = $pdo->query("SELECT * FROM empleados ORDER BY id DESC");
      $rows = $query->fetchAll();
      return array_map(fn($r) => new Empleado($r), $rows);
    }

    public function getById($id) {
      $pdo = getPDO();
      $query = $pdo->prepare("SELECT * FROM empleados WHERE id = ?");
      $query->execute([$id]);
      $row = $query->fetch();
      return $row ? new Empleado($row) : null;
    }

    public function getByUsuario($usuario) {
      $pdo = getPDO();
      $query = $pdo->prepare("SELECT * FROM empleados WHERE usuario = ?");
      $query->execute([$usuario]);
      $row = $query->fetch();
      return $row ? new Empleado($row) : null;
    }

    public function create($data) {
      $pdo = getPDO();
      $query = $pdo->prepare("INSERT INTO empleados(nombre, apaterno, amaterno, direccion, telefono, ciudad, estado, usuario, password, rol) VALUES(?,?,?,?,?,?,?,?,?,?)");
      $query->execute([
        $data['nombre'],
        $data['apaterno'],
        $data['amaterno'] ??  '',
        $data['direccion'] ?? '',
        $data['telefono'] ??  '',
        $data['ciudad'] ??    '',
        $data['estado'] ??    '',
        $data['usuario'] ,
        $data['password'] ,
        $data['rol'] ?? 'user',
      ]);
      return $this->getById($pdo->lastInsertId());
    }

    public function delete($id) {
      $pdo = getPDO();
      $query = $pdo->prepare("DELETE FROM empleados WHERE id = ?");
      $query->execute([$id]);
      return $query->rowCount() > 0;
    }

    public function update($id, $data) {
      $fields = [];
      $values = [];
      foreach($data as $k => $v) {
        $fields[] = "$k = ?";
        $values[] = $v;
      }

      if(empty($fields)) {
        return $this->getById($id);
      }

      $values[] = $id;
      $query = "UPDATE empleados SET" . implode(".", $fields) . " WHERE id = ?";
      $pdo = getPDO();
      $stmt = $pdo->prepare($query);
      $stmt->execute($values);
      return $this->getById($id);
    }
  }