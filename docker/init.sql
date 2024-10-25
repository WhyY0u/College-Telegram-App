CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    iin VARCHAR(20) NOT NULL UNIQUE,
    surname VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    patronymic VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    pin_code VARCHAR(256) NOT NULL,
    phone VARCHAR(10) UNIQUE,
    birth_date DATE, 
    is_registered BOOLEAN NOT NULL DEFAULT FALSE,
    role ENUM('Student', 'Teacher', 'Admin') NOT NULL DEFAULT 'Student'
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE user_tokens (
    user_id BIGINT NOT NULL,
    token VARCHAR(255) NOT NULL,
    device VARCHAR(255),
    PRIMARY KEY (user_id, token),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
