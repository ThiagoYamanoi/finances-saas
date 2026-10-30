import { tool } from "langchain";
import { z } from "zod";
import { transacoes } from "../data/transacoes.js";

export const maiorGasto = tool(
    async() => {

        console.log("Iniciando ferramenta maior_gasto");

        todos = {};

        transacoes.forEach(t => {
            if(todos[t.categoria] === undefined){
                todos[t.categoria] = 0;
            }

            todos[t.categoria] += t.valor
        })
        let maior = 0
        let Gastocategoria = null;
        for(const categoria in total){
            if(total[categoria] > maior){
                maior = total[categoria];
                Gastocategoria = categoria
            }
        }

        console.log("Resultado da ferramenta:", categoria, maior);

        return JSON.stringify({
            valor: maior,
            categoria: Gastocategoria        
        })
    },
    {
        name: "maior_gasto",

        description: "Identifica a categoria com o maior gasto total.",

        schema: z.object({})
    }    
   
)