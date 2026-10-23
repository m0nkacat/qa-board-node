const express = require('express');
const cors = require('cors');
const path = require('path');

const usersRoutes = require('./routes/users');
const todosRoutes = require('./routes/todos');
const questionsRoutes = require('./routes/questions');
const tagsRoutes = require('./routes/tags');

require('dotenv').config();

const app = express();

// CORS – обязательно разрешаем кастомный заголовок
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'x-user-id']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRoutes);
app.use('/todos', todosRoutes);
app.use('/questions', questionsRoutes);
app.use('/tags', tagsRoutes);

// Статика фронта (если нужно)
app.use('/frontend', express.static(path.join(__dirname, '../frontend')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});