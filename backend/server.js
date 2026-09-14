import express from 'express';
import cors from 'cors';

import transactionRoutes from './src/routes/transactionRoutes.js';
import accountRoutes from './src/routes/accountRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import pluggyRoutes from './src/routes/pluggyRoutes.js'

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/auth', authRoutes); 
app.use('/transactions', transactionRoutes);
app.use('/accounts', accountRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);
app.use('/bank', pluggyRoutes)

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});