const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

router.use(auth);   


router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM questions ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});


router.post('/add', async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.userId;

        if (!title || !description) {
            return res.status(400).json({ error: "missing fields" });
        }

        const result = await pool.query(
            `INSERT INTO questions (title, description, user_id)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [title, description, userId]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.log("SQL ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM questions WHERE id = $1 AND user_id = $2 RETURNING id',
            [req.params.id, req.userId]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Вопрос не найден или доступ запрещён' });
        }
        res.json({ message: 'deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;