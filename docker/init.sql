CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    iin VARCHAR(20) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    patronymic VARCHAR(50),
    birth_date DATE,
    pin_code VARCHAR(256) NOT NULL,
    is_registered BOOLEAN NOT NULL DEFAULT FALSE,
    role ENUM('Student', 'Teacher', 'Admin') NOT NULL DEFAULT 'Student',
    jwt_token VARCHAR(512) DEFAULT ''
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

