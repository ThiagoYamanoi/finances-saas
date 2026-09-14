import { Router } from 'express';
import bcrypt from 'bcrypt';
import pool from '../database/connection.js';

const router = Router();


// POST /users
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users
        (name, email, password_hash)

      VALUES
        ($1, $2, $3)

      RETURNING
        id,
        name,
        email
      `,
      [
        name,
        email,
        passwordHash
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);

    if (error.code === '23505') {
    return res.status(409).json({
      error: 'Este email já está cadastrado'
    });
  }
    res.status(500).json({
      error: 'Erro ao criar usuário'
    });
  }
});


export default router;