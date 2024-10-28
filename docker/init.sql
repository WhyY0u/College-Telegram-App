CREATE DATABASE IF NOT EXISTS college;
USE college;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    iin VARCHAR(20) NOT NULL UNIQUE,
    surname VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    patronymic VARCHAR(50) NOT NULL,
    pin_code VARCHAR(256),
    phone VARCHAR(10) UNIQUE,
    birth_date DATE, 
    is_registered BOOLEAN NOT NULL DEFAULT FALSE,
    role ENUM('Student', 'Teacher', 'Admin') NOT NULL DEFAULT 'Student'
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS user_tokens (
    user_id BIGINT NOT NULL,
    token VARCHAR(512) NOT NULL,
    device VARCHAR(255),
    PRIMARY KEY (user_id, token),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
