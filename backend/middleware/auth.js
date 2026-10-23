const pool = require('../db');

module.exports = async (req, res, next) => {
    const userId = req.headers['x-user-id'];
    if (!userId) {
        return res.status(401).json({ error: 'Необходимо авторизоваться' });
    }

    try {
        const result = await pool.query('SELECT id FROM users WHERE id = $1', [userId]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Пользователь не найден' });
        }
        req.userId = userId; 
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка проверки авторизации' });
    }
};