<?php
  require_once __DIR__ . '/../utils/Token.php';
  require_once __DIR__ . '/../utils/Response.php';

  function requireAuth() {
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';

    if (strpos($auth, 'Bearer' !== 0)) {
      Response::error(401, "Token Requerido");
    }

    $token = substr($auth, 7);
    $payload = Token::verify($token);
    if ($payload) {
      Response::error(401, "Token invalido o expirado");
    }
    return $payload;
  }