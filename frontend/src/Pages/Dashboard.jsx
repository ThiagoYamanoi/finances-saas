import { useEffect, useState } from 'react';

import Form from '../Components/Form';
import BankConnect from '../Components/BankConnect';

import { getTransactions } from '../Services/TransactionApis';
import { syncBankData } from '../Services/PluggyApis';


function Dashboard() {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    async function loadDashboard() {

      setLoading(true);
      try {
        try {

          await syncBankData();

        } catch (error) {

          console.log(
            "Sincronização bancária não realizada:",
            error.message
          );
        }

        const data = await getTransactions();

        setTransactions(data);

      } catch (error) {

        console.error(
          "Erro ao buscar transações:",
          error
        );

      } finally {

        setLoading(false);

      }

    }

    loadDashboard();

  }, []);


  function handleTransactionCreated(newTransaction) {

    setTransactions(previousTransactions => {

      const updatedTransactions = [
        ...previousTransactions,
        newTransaction
      ];

      return updatedTransactions.sort((a, b) => {

        const dateDifference =
          new Date(b.data) - new Date(a.data);

        if (dateDifference !== 0) {
          return dateDifference;
        }

        return b.id - a.id;
      });

    });

  }

  return (

    <div className="min-h-screen bg-gray-100 text-gray-800">

      <header className="bg-gray-900 px-8 py-8 text-white">

        <div className="mx-auto flex w-[90%] max-w-6xl items-center justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              Finance SaaS
            </p>

            <h1 className="text-3xl font-bold">
              Minhas finanças
            </h1>

          </div>

          <BankConnect />

        </div>

      </header>


      <main className="mx-auto grid w-[90%] max-w-6xl grid-cols-1 gap-8 py-10 lg:grid-cols-[350px_1fr]">

        <Form
          onTransactionCreated={handleTransactionCreated}
        />


        <section className="rounded-2xl bg-white p-7 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Histórico
              </p>

              <h2 className="text-2xl font-bold">
                Transações
              </h2>

            </div>


            <span className="rounded-full bg-gray-100 px-3 py-2 text-sm">
              {transactions.length} transações
            </span>

          </div>


          {loading ? (

            <div className="flex items-center gap-3 py-10 text-gray-500">

              <div
                className="
                  h-6
                  w-6
                  animate-spin
                  rounded-full
                  border-4
                  border-gray-300
                  border-t-gray-700
                "
              />

              <span>
                Atualizando suas finanças...
              </span>

            </div>

          ) : (

            <div className="flex flex-col gap-3">

              {transactions.map(transaction => (

                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:shadow-md"
                >

                  <div>

                    <h3 className="font-semibold">
                      {transaction.description}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {new Date(transaction.data).toLocaleDateString('pt-BR')}
                    </p>

                  </div>


                  <div className="text-right">

                    <strong>
                      R$ {Number(transaction.amount).toFixed(2)}
                    </strong>

                    <p className="text-xs text-gray-400">
                      Conta {transaction.account_name}
                      {' • '}
                      Categoria {transaction.category_name || "Sem categoria"}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>

  );

}

export default Dashboard;