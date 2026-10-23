-- Схема PostgreSQL под запросы из backend/routes.

CREATE TABLE IF NOT EXISTS users (
    id        SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email     VARCHAR(255) NOT NULL UNIQUE,
    login     VARCHAR(100) NOT NULL UNIQUE,
    password  VARCHAR(255) NOT NULL,
    role      VARCHAR(50)  NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS questions (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(300) NOT NULL,
    description TEXT,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tags (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS todos (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(300) NOT NULL,
    description TEXT,
    is_done     BOOLEAN NOT NULL DEFAULT FALSE
);
