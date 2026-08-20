import express from 'express';
import pool from './src/database/connection.js';

const app = express();

app.use(express.json());

app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');

        res.json(result.rows[0]);

    } catch (error) {
        console.error('Erro ao conectar com o banco:', error);

        res.status(500).json({
            error: 'Erro ao conectar com o banco de dados'
        });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});