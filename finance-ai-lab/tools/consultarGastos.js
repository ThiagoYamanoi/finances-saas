import { tool } from "langchain";
import { z } from "zod";
import { transacoes } from "../data/transacoes.js";

export const consultarGastos = tool(
    async ({ categoria }) => {

        console.log("Executando consultarGastos:", categoria);

        const total = transacoes
            .filter(t => t.categoria === categoria)
            .reduce((soma, t) => soma + t.valor, 0);

        return JSON.stringify({
            categoria,
            total
        });
    },
    {
        name: "consultar_gastos",

        description: "Consulta o total gasto em uma categoria financeira.",

        schema: z.object({
            categoria: z.enum([
                "alimentacao",
                "transporte",
                "lazer",
                "saude"
            ])
        })
    }
);