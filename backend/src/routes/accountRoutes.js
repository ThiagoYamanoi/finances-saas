import { Router } from 'express';
import pool from '../database/connection.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT *
      FROM accounts
      WHERE user_id = $1
      ORDER BY name
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar contas'
    });
  }
});

export default router;