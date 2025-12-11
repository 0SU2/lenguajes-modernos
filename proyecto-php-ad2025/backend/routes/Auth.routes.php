<?php
  require_once __DIR__ . '/../controllers/AuthController.php';

  function registerAuthRoutes($method, $uri) {
    if ($method === 'POST' && $uri === '/api/login') {
      AuthController::login();
    }
  }