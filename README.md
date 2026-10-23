# 📋 Q&A Board (Node.js)

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

**RU** | [EN](#english)

Веб-приложение «вопросы и ответы + задачи»: бэкенд на Express и PostgreSQL, фронтенд на чистом HTML/CSS/JS.

## Возможности
- ❓ Вопросы и теги
- ✅ Список задач (todo)
- 👤 Пользователи: регистрация и вход, middleware для защищённых маршрутов
- 🔌 REST API: `/questions`, `/tags`, `/todos`, `/users`

## Стек
Node.js · Express 5 · PostgreSQL (`pg`, `knex`) · dotenv · vanilla JS

## Запуск
1. Создай БД и выполни `backend/database.sql`.
2. Скопируй `backend/.env.example` в `backend/.env` и заполни.
3. ```bash
   cd backend && npm install && node server.js
   ```
4. Открой http://localhost:3000/frontend/index.html

---

## English

A Q&A + todo web app: Express/PostgreSQL backend and a vanilla HTML/CSS/JS frontend, with questions, tags, todos and user sign-up/sign-in.

**Run:** apply `backend/database.sql`, copy `.env.example` → `.env`, `cd backend && npm install && node server.js`, then open http://localhost:3000/frontend/index.html.
