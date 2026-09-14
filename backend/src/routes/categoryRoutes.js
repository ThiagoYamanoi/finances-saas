import { Router } from 'express';
import pool from '../database/connection.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM category
      ORDER BY name
      `
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao buscar categorias'
    });
  }
});

export default router;