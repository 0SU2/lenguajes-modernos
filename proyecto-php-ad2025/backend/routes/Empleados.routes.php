<?php
  require_once __DIR__ . '/../controllers/EmpleadoController.php';

  function registerEmpleadosRoutes($method, $uri) {
    if ($method === 'GET' && $uri === '/api/empleados') {
      EmpleadoController::getAll();
    }
    if ($method === 'POST' && $uri === '/api/empleados') {
      EmpleadoController::create();
    }
    if ($method === 'PUT' && preg_match('#^/api/empleado/(\d+)$#', $uri, $m)) {
      $id = $m[1];
      EmpleadoController::update($id);
    }
    if ($method === 'DELETE' && preg_match('#^/api/empleado/(\d+)$#', $uri, $m)) {
      $id = $m[1];
      EmpleadoController::update($id);
    }
  }