import express from 'express';
import pool from './src/database/connection.js';
import cors from 'cors';

const app = express();


app.use(cors({
    origin: 'http://localhost:5173'
}));


app.use(express.json());

app.get('/transactions', async(req, res) =>{
    try{
        const resultTransaction = await pool.query('SELECT * FROM transactions')

        res.json(resultTransaction.rows)

    } catch{
        console.error(error)

        res.status(500).json({
            error: 'erro ao buscar transações'
        })
    }
    
})


app.post( '/transactions', async(req, res) =>{
    try {
        const {
        description,
        amount,
        account_id,
        category_id
    } =  req.body
    
    const result = await pool.query(
        `INSERT INTO TRANSACTIONS(description, amount, account_id, category_id)
        VALUES($1, $2, $3, $4) RETURNING *`
        , [description, amount, account_id, category_id]

    )
    res.status(201).json(result.rows[0]);

}
     
catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao criar transação'
    });
  }
}

)

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