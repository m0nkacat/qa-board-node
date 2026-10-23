const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

router.use(auth);   

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/add', async (req, res) => {
    try {
        const { title, description, is_done } = req.body;
        const done = is_done === true || is_done === 'true' || is_done === 1 || is_done === '1';
        const userId = req.userId;

        const result = await pool.query(
            `INSERT INTO todos (user_id, title, description, is_done)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [userId, title, description, done]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING id',
            [req.params.id, req.userId]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Задача не найдена или доступ запрещён' });
        }
        res.json({ message: 'deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;