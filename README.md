# qa-board-node

Веб-приложение с пользователями, вопросами, тегами и задачами · *Users, questions, tags and todos web app*

`Node.js` `Express 5` `PostgreSQL` `JavaScript`

## Что сделано
- REST API на Express с разделением на роуты: `/users`, `/questions`, `/tags`, `/todos`
- Регистрация и вход (`/users/register`, `/users/login`), у пользователя есть роль (по умолчанию `user`)
- Middleware авторизации: защищённые маршруты проверяют заголовок `x-user-id` по базе
- CRUD: список, добавление (`/add`) и удаление (`/delete/:id`) для каждой сущности. Удалять свои вопросы и задачи может только их автор
- PostgreSQL через пул соединений `pg`, параметризованные запросы
- Настройки подключения вынесены в `.env`
- Фронтенд на чистом HTML, CSS и JS: отдельная страница для каждой сущности, текущий пользователь хранится в `localStorage`

## Структура
```
backend/
├── server.js            # Express-приложение, CORS, подключение роутов, раздача фронтенда
├── db.js                # пул соединений PostgreSQL
├── middleware/auth.js   # проверка пользователя по заголовку x-user-id
├── routes/
│   ├── users.js         # регистрация, вход, список, добавление, удаление
│   ├── questions.js     # вопросы
│   ├── tags.js          # теги
│   └── todos.js         # задачи
├── database.sql         # схема БД: users, questions, tags, todos
└── .env.example         # шаблон настроек БД
frontend/
├── index.html           # главная со ссылками на разделы
├── auth.js              # вход и выход, хранение пользователя
└── users / questions / tags / todos (.html + .js)
style.css
```

## Запуск
1. Создай БД в PostgreSQL и выполни `backend/database.sql`.
2. Скопируй `backend/.env.example` в `backend/.env` и заполни.
3. Запусти сервер:
   ```bash
   cd backend
   npm install
   node server.js
   ```
4. Открой http://localhost:3000/frontend/index.html

---

## English

A web app with users, questions, tags and todos: an Express + PostgreSQL REST API and a vanilla HTML/CSS/JS frontend.

### Features
- Express REST API split into routers: `/users`, `/questions`, `/tags`, `/todos`
- Sign-up and login (`/users/register`, `/users/login`); users have a role (`user` by default)
- Auth middleware: protected routes check the `x-user-id` header against the database
- CRUD for every entity: list, add (`/add`), delete (`/delete/:id`); only the author can delete their own questions and todos
- PostgreSQL via a `pg` connection pool with parameterized queries
- Connection settings in `.env`
- Vanilla frontend with a page per entity; the current user is kept in `localStorage`

### Structure
```
backend/   server.js, db.js, middleware/auth.js, routes/{users,questions,tags,todos}.js, database.sql, .env.example
frontend/  index.html, auth.js, users/questions/tags/todos pages
```

### Run
1. Create a PostgreSQL database and run `backend/database.sql`.
2. Copy `backend/.env.example` to `backend/.env` and fill it in.
3. `cd backend && npm install && node server.js`
4. Open http://localhost:3000/frontend/index.html
