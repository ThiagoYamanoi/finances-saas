import express from "express";
import { createConnectToken, getAccountsByItemId } from "../../Services/PluggyService.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import pool from "../database/connection.js";
import { saveBankAccount } from "../../Services/BankAccountService.js";

const router = express.Router();

router.post("/connect", async (req, res) => {
    try {
        const accessToken = await createConnectToken();

        res.json({
            accessToken
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Erro ao criar Connect Token"
        });
    }
});


router.post(
    "/connections",
    authenticateToken,
    async (req, res) => {
        try {
            const { itemId } = req.body;

            if (!itemId) {
            return res.status(400).json({
                error: "itemId é obrigatório"
            });
        }

            const userId = req.user.id;

            const result = await pool.query(
                `
                INSERT INTO bank_connections
                    (user_id, pluggy_item_id)
                VALUES ($1, $2)
                RETURNING *
                `,
                [userId, itemId]
            );

            res.status(201).json(result.rows[0]);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao salvar conexão bancária"
            });
        }
    }
);

router.get(
    "/accounts",
    authenticateToken,
    async (req, res) => {

        try {

            const userId = req.user.id;

            const result = await pool.query(
                `
                SELECT pluggy_item_id
                FROM bank_connections
                WHERE user_id = $1
                `,
                [userId]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({
                    error: "Nenhuma conexão bancária encontrada"
                });
            }

            let accounts = [];

            for (const connection of result.rows) {

                const pluggyAccounts = await getAccountsByItemId(
                        connection.pluggy_item_id
                    );

                accounts.push(...pluggyAccounts);
            }

            res.json(accounts);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: "Erro ao buscar contas bancárias"
            });
        }
    }
);

export default router;