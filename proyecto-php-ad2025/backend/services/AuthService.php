<?php
  require_once __DIR__ . '/../repositories/EmpleadoRepository.php';
  require_once __DIR__ . '/../utils/Password.php';
  require_once __DIR__ . '/../utils/Token.php';

  class AuthService {
    private $repo;
    public function __construct() {
      $this->repo = new EmpleadoRepository();
    }

    public function login($usuario, $password) {
      $empleado = $this->repo->getByUsuario($usuario);
      if (!$empleado) {
        return [false, "Usuario no existe"];
      }
      if (!Password::verify($password, $empleado->password)) {
        return [false, "Password incorrecto"];
      }
      $payload = [
        'id' => $empleado->id,
        'usuario' => $empleado->usuario,
        'rol' => $empleado->rol,
      ];
      $token = Token::create($payload);
      return [true, [
        'token' => $token,
        'user' => $empleado->toPublic(),
      ]];
    }
  }