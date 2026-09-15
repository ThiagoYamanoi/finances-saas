import { Router } from 'express';
import pool from '../database/connection.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
  try {

    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        t.*,
        a.name AS account_name,
        c.name AS category_name

      FROM transactions t

      INNER JOIN accounts a
        ON t.account_id = a.id

      LEFT JOIN category c
        ON t.category_id = c.id

      WHERE a.user_id = $1

      ORDER BY t.data DESC, t.id DESC;
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar transações'
    });
  }
});
router.post('/', authenticateToken, async (req, res) => {
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

export default router;