<?php
  require_once __DIR__ . '/../services/EmpleadoService.php';
  require_once __DIR__ . '/../utils/Response.php';
  require_once __DIR__ . '/../helpers/Request.php';
  require_once __DIR__ . '/../middleware/AuthMiddleware.php';

  class EmpleadoController {
    public static function getAll() {
      requireAuth();
      $service = new EmpleadoService();
      $data = $service->listAll();
      Response::ok($data);
    }

    public static function create() {
      requireAuth();
      $body = getJsonInput();
      $service = new EmpleadoService();
      [$ok, $result] = $service->createEmpleado($body);
      if (!$ok) {
        Response::error(400, $result);
      }
      Response::ok($result);
    }

    public static function update($id) {
      requireAuth();
      $body = getJsonInput();
      $service = new EmpleadoService();
      [$ok, $result] = $service->updateEmpleado($id, $body);
      if (!$ok) {
        Response::error(400, $result);
      }
      Response::ok($result);
    }

    public static function delete($id) {
      requireAuth();
      $service = new EmpleadoService();
      [$ok, $result] = $service->deleteEmpleado($id);
      if (!$ok) {
        Response::error(400, $result);
      }
      Response::ok(['message' => $result]);
    }
  }