import "dotenv/config";
import { ChatOpenRouter } from "@langchain/openrouter";
import { createAgent } from "langchain";

import { consultarGastos } from "./tools/consultarGastos.js";
import { maiorGasto } from "./tools/maiorGastos.js";

const modelo = new ChatOpenRouter({
    model: "openrouter/free",
    apiKey: process.env.OPENROUTER_API_KEY
});

const agente = createAgent({
    model: modelo,

    tools: [consultarGastos, maiorGasto],

    systemPrompt: `
        Você é o Finance AI, assistente financeiro
        integrado ao Finance SaaS.

        Utilize as ferramentas disponíveis para
        consultar e analisar gastos.

        Nunca invente valores financeiros.

        Responda sempre em português.
    `
});

async function main() {
    const resposta = await agente.invoke({
        messages: [
            {
                role: "user",
                content: "Qual categoria teve o maior gasto?"
            }
        ]
    });

    console.log(resposta.messages.at(-1)?.content);
}

main().catch(console.error);