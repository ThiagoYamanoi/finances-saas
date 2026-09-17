import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { syncBankData } from "../../Services/BankSyncAccountTransanctions";

const router = express.Router();

router.post(
    "/sync",
    authenticateToken,
    async (req, res) => {
        try {

            const userId = req.user.id;

            const result = await syncBankData(userId);

            res.status(200).json({
                message: "Dados bancários sincronizados com sucesso",
                accounts: result.accounts,
                transactions: result.transactions
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: error.message
            });

        }
    }
);

export default router;