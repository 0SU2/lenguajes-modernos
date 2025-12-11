CREATE DATABASE IF NOT EXISTS proyecti_php_ad2025 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE proyecti_php_ad2025;

CREATE TABLE empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apaterno VARCHAR(100) NOT NULL,
    amaterno VARCHAR(100),
    direccion VARCHAR(255),
    telefono VARCHAR(15),
    ciudad VARCHAR(100),
    estado VARCHAR(100),
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'user') DEFAULT 'admin' created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)

