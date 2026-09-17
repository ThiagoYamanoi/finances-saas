import pool from "../src/database/connection.js";

export async function getOrCreateBankCategory(transaction, accountType) {

    if (!transaction.category || !transaction.categoryId) {
        return null;
    }

    const existingCategory = await pool.query(
        `
        SELECT id
        FROM category
        WHERE pluggy_category_id = $1
        `,
        [transaction.categoryId]
    );

    if (existingCategory.rows.length > 0) {
        return existingCategory.rows[0].id;
    }

    let type;

    if (accountType === "CREDIT") {
        type = "EXPENSE";
    } else {
        type =  transaction.type === "CREDIT"
                ? "INCOME"
                : "EXPENSE";
    }

    const result = await pool.query(
        `
        INSERT INTO category (
            name,
            type,
            pluggy_category_id,
            source
        )
        VALUES ($1, $2, $3, $4)
        RETURNING id
        `,
        [
            transaction.category,
            type,
            transaction.categoryId,
            "PLUGGY"
        ]
    );

    return result.rows[0].id;
}