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

router.post('/', authenticateToken, async (req, res) =>{
  try{
    const {
      name,
      type
    } = req.body;

      if (
      typeof name !== "string" ||
      !name.trim() ||
      !["INCOME", "EXPENSE"].includes(type)
  ) {
      return res.status(400).json({
          error: "Nome ou tipo de categoria inválido"
      });
  }
    const userId = req.user.id;

    const result = await pool.query(
      
      `
        INSERT INTO category (
            name,
            type,
            pluggy_category_id,
            source,
            user_id
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
        `,
        [
            name.trim(),
            type,
            null,
            "MANUAL",
            userId
        ] 
      
    )

      return res.status(201).json({
    message: "Categoria criada com sucesso",
    category: result.rows[0]
  });
  } catch (error){
  console.error(error);

    res.status(500).json({
      error: 'Erro ao inserir categoria'
    });
}})


export default router;