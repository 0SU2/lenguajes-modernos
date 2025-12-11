<?php
  require_once __DIR__ . '/../services/AuthService.php';
  require_once __DIR__ . '/../utils/Response.php';
  require_once __DIR__ . '/../helpers/Request.php';

  class AuthController {
    public static function login() {
      $body = getJsonInput();
      $usuario = $body['usuario'] ?? '';
      $password = $body['password'] ?? '';
      $service = new AuthService();
      [$ok, $result] = $service->login($usuario, $password);

      if (!$ok) {
        Response::error(401, $result);
      }
      Response::ok($result);
    }
  }