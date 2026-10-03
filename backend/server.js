import express from 'express';
import cors from 'cors';

import transactionRoutes from './src/routes/transactionRoutes.js';
import accountRoutes from './src/routes/accountRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import pluggyRoutes from './src/routes/pluggyRoutes.js'
import bankSyncRoutes from "./src/routes/bankSyncRoutes.js";
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use(express.json());

app.use('/auth', authRoutes); 
app.use('/transactions', transactionRoutes);
app.use('/accounts', accountRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);
app.use('/bank', pluggyRoutes)
app.use("/bank", bankSyncRoutes);   

app.listen(PORT, () => {
  console.log('Servidor rodando na porta 3000');
});