import express from "express";
import pool from "../database/connection.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { saveBankTransaction } from "../../Services/BankTransactionService.js";

import {
    getAccountsByItemId,
    getTransactionsByAccountId
} from "../../Services/PluggyService.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
    try {

        const userId = req.user.id;

        const connections = await pool.query(
            `
            SELECT pluggy_item_id
            FROM bank_connections
            WHERE user_id = $1
            `,
            [userId]
        );

        if (connections.rows.length === 0) {
            return res.status(404).json({
                error: "Nenhuma conexão bancária encontrada"
            });
        }

        const transactions = [];

        for (const connection of connections.rows) {

            const accounts = await getAccountsByItemId(
                    connection.pluggy_item_id
                );

            for (const account of accounts) {

                const accountTransactions = await getTransactionsByAccountId(
                        account.id
                    );  

                transactions.push(
                    ...accountTransactions
                );
            }
        }

        res.json(transactions);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Erro ao buscar transações bancárias"
        });
    }
});

router.post("/sync", authenticateToken, async (req, res) => {
    try {

        const userId = req.user.id;

        const connections = await pool.query(
            `
            SELECT pluggy_item_id
            FROM bank_connections
            WHERE user_id = $1
            `,
            [userId]
        );

        if (connections.rows.length === 0) {
            return res.status(404).json({
                error: "Nenhuma conexão bancária encontrada"
            });
        }

        const savedTransactions = [];

        for (const connection of connections.rows) {

            const accounts = await getAccountsByItemId(
                connection.pluggy_item_id
            );

            for (const account of accounts) {

                const transactions = await getTransactionsByAccountId(
                    account.id
                );

                for (const transaction of transactions) {

                    const savedTransaction = await saveBankTransaction(
                        transaction,
                        userId
                    );

                    savedTransactions.push(savedTransaction);
                }
            }
        }

        res.json(savedTransactions);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Erro ao sincronizar transações bancárias"
        });
    }
});


export default router;