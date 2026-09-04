import express from 'express';
import pool from './src/database/connection.js';
import cors from 'cors';

const app = express();


app.use(cors({
    origin: 'http://localhost:5173'
}));


app.use(express.json());

app.get('/transactions', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        t.id,
        t.description,
        t.amount,
        t.data,
        t.account_id,
        a.name AS account_name,
        t.category_id,
        c.name AS category_name
      FROM transactions t

      INNER JOIN accounts a
        ON t.account_id = a.id

      INNER JOIN category c
        ON t.category_id = c.id

      ORDER BY t.data DESC
    `);

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar transações'
    });
  }
});

app.post('/transactions', async (req, res) => {
  try {
    const {
      description,
      amount,
      data,
      account_id,
      category_id
    } = req.body;

    const result = await pool.query(
      `
      WITH inserted AS (
        INSERT INTO transactions
          (description, amount, data, account_id, category_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      )

      SELECT
        i.id,
        i.description,
        i.amount,
        i.data,
        i.account_id,
        a.name AS account_name,
        i.category_id,
        c.name AS category_name

      FROM inserted i

      INNER JOIN accounts a
        ON i.account_id = a.id

      INNER JOIN category c
        ON i.category_id = c.id
      `,
      [
        description,
        amount,
        data,
        account_id,
        category_id
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao criar transação'
    });
  }
});

app.get('/categories', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM category ORDER BY name'
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar categorias'
    });
  }
});

app.get('/accounts', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM accounts ORDER BY name'
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar contas'
    });
  }
});



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