<?php
    // --- Cargamos el .env ---
    require_once __DIR__ . '/config/env.php';
    loadEnv(__DIR__ . '/.env');

    // --- Configuración del CORS ---
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }

    require_once __DIR__ . '/utils/Response.php';
    require_once __DIR__ . '/routes/Auth.routes.php';
    require_once __DIR__ . '/routes/Empleados.routes.php';

    $method = $_SERVER['REQUEST_METHOD'];
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    registerAuthRoutes($method, $uri);
    registerEmpleadosRoutes($method, $uri);

    Response::error(404, "Ruta no encontrada ($method $uri)");



