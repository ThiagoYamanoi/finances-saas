import pool from "../src/database/connection.js";

export async function saveBankAccount(
    account,
    bankConnectionId,
    userId
) {

    const result = await pool.query(
        `
        INSERT INTO accounts (
            name,
            type,
            balance,
            user_id,
            pluggy_account_id,
            bank_connection_id,
            subtype,
            currency_code,
            source
        )
        VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9
        )

        ON CONFLICT (pluggy_account_id)
        DO UPDATE SET
            name = EXCLUDED.name,
            type = EXCLUDED.type,
            balance = EXCLUDED.balance,
            user_id = EXCLUDED.user_id,
            bank_connection_id = EXCLUDED.bank_connection_id,
            subtype = EXCLUDED.subtype,
            currency_code = EXCLUDED.currency_code

        RETURNING *
        `,
        [
            account.name,
            account.type,
            account.balance,
            userId,
            account.id,
            bankConnectionId,
            account.subtype,
            account.currencyCode,
            "PLUGGY"
        ]
    );

    return result.rows[0];
}