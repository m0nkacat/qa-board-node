const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

router.use(auth);  


router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tags ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/add', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "missing name" });
        }

        const result = await pool.query(
            `INSERT INTO tags (name) VALUES ($1) RETURNING *`,
            [name]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM tags WHERE id = $1', [req.params.id]);
        res.json({ message: 'deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;