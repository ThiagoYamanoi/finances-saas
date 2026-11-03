import pool from "../src/database/connection.js";

export async function getOrCreateBankCategory(transaction, accountType) {

    if (!transaction.category ) {
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
            source,
            user_id
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
        `,
        [
            transaction.category,
            type,
            transaction.categoryId,
            "PLUGGY",
            null
        ]
    );

    return result.rows[0].id;
}