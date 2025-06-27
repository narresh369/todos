import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import pkg from 'pg';

dotenv.config();
const { Pool } = pkg;

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// 🛡️ Secure pool config
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Create todos table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT false
  )
`);

app.get('/api/todos', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM todos ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

app.post('/api/todos', async (req, res) => {
    try {
        const { title } = req.body;
        const { rows } = await pool.query(
            'INSERT INTO todos(title) VALUES($1) RETURNING *',
            [title]
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add todo' });
    }
});

app.put('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        await pool.query('UPDATE todos SET completed = $1 WHERE id = $2', [completed, id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM todos WHERE id = $1', [id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
