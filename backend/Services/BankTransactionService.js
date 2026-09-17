import pool from "../src/database/connection.js";
import { getOrCreateBankCategory } from "./BankCategoryService.js";

export async function saveBankTransaction(
    transaction, userId
) {
    const accountResult = await pool.query(
        `
        SELECT id, type
        FROM accounts
        WHERE pluggy_account_id = $1
          AND user_id = $2
        `,
        [
            transaction.accountId,
            userId
        ]
    );

    if (accountResult.rows.length === 0) {
        throw new Error(
            `Conta da Pluggy não encontrada: ${transaction.accountId}`
        );
    }

    const accountId = accountResult.rows[0].id;
    const accountType = accountResult.rows[0].type;
    const categoryId = await getOrCreateBankCategory(transaction, accountType );

    const date = transaction.date.toISOString().split("T")[0];

    const result = await pool.query(
    `
    INSERT INTO transactions (
        description,
        amount,
        data,
        account_id,
        category_id,
        pluggy_transaction_id,
        source
    )
    VALUES (
        $1, $2, $3, $4, $5, $6, $7
    )

    ON CONFLICT (pluggy_transaction_id)
    DO UPDATE SET
        description = EXCLUDED.description,
        amount = EXCLUDED.amount,
        data = EXCLUDED.data,
        account_id = EXCLUDED.account_id,
        category_id = EXCLUDED.category_id

    RETURNING *
    `,
    [
        transaction.description,
        transaction.amount,
        date,
        accountId,
        categoryId,
        transaction.id,
        "PLUGGY"
    ]
);

    return result.rows[0];
}