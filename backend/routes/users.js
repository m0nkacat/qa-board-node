const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

router.post('/register', async (req, res) => {
    try {
        const { full_name, email, login, password } = req.body;


        const checkUser = await pool.query(
            `SELECT id FROM users WHERE email = $1 OR login = $2`,
            [email, login]
        );
        if (checkUser.rows.length > 0) {
            return res.status(400).json({ error: "Пользователь с таким email или логином уже существует" });
        }

        const result = await pool.query(
            `INSERT INTO users (full_name, email, login, password, role)
             VALUES ($1, $2, $3, $4, 'user')
             RETURNING id, full_name, email, login, role`,
            [full_name, email, login, password]
        );

        res.json({ message: "Регистрация успешна", user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ошибка внесения данных" });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        const result = await pool.query(
            `SELECT id, full_name, email, login, role FROM users 
             WHERE (login = $1 OR email = $1) AND password = $2`,
            [login, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Неверный логин/email или пароль" });
        }

        const user = result.rows[0];
        res.json({
            message: "Вход выполнен",
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                login: user.login,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ошибка входа" });
    }
});


router.use(auth);  


router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, full_name, email, login, role FROM users ORDER BY id'
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


router.post('/add', async (req, res) => {
    try {
        const { full_name, email, login, password, role } = req.body;
        const userRole = role || 'user';

        const result = await pool.query(
            `INSERT INTO users (full_name, email, login, password, role)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, full_name, email, login, role`,
            [full_name, email, login, password, userRole]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error("SQL ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.json({ message: 'User deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;