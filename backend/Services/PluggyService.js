import { PluggyClient } from "pluggy-sdk";

const pluggy = new PluggyClient({
    clientId: process.env.PLUGGY_CLIENT_ID,
    clientSecret: process.env.PLUGGY_CLIENT_SECRET
});

export async function createConnectToken() {
    const connectToken = await pluggy.createConnectToken();

    return connectToken.accessToken;
}

export async function getAccountsByItemId(itemId) {

    const accounts = await pluggy.fetchAccounts(itemId);

    return accounts.results;
}

export async function getTransactionsByAccountId(accountId) {

    const transactions = await pluggy.fetchAllTransactions(accountId);

    return transactions;
}

export async function createWebhook(url) {
    const webhook = await pluggy.createWebhook(
        "item/updated",
        url,
        {
            "X-WEBHOOK-SECRET": process.env.PLUGGY_WEBHOOK_SECRET
        }
    );

    return webhook;
}

