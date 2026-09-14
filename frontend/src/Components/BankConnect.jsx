import { useState } from "react";
import { PluggyConnect } from "react-pluggy-connect";
import { getConnectToken, saveBankConnection } from "../Services/PluggyApis";

function BankConnect() {

    const [connectToken, setConnectToken] = useState(null);

    async function connectBank() {
        try {
            const token = await getConnectToken();

            setConnectToken(token);

        } catch (error) {
            console.error("Erro ao gerar Connect Token:", error);
        }
    }

    async function handleSuccess({item}) {
         try {

        console.log("ITEM ID:", item.id);

        const connection =
            await saveBankConnection(item.id);

        console.log(
            "Conexão salva no banco:",
            connection
        );

    } catch (error) {
        console.error(error);
    }

    }

    function handleError(error) {
        console.error("Erro na conexão bancária:", error);
    }

    function handleClose() {
        console.log("Widget fechado");

        setConnectToken(null);
    }

    return (
        <>
            <button
                onClick={connectBank}
                className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    font-semibold
                    px-5
                    py-3
                    rounded-xl
                    shadow-md
                    hover:shadow-lg
                    transition-all
                    duration-200
                    cursor-pointer
                    active:scale-95
                "
            >
                Conectar banco
            </button>

            {connectToken && (
                <PluggyConnect
                    connectToken={connectToken}
                    includeSandbox={true}
                    onSuccess={handleSuccess}
                    onError={handleError}
                    onClose={handleClose}
                />
            )}
        </>
    );
}

export default BankConnect;