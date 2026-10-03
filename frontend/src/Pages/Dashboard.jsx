import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '../Components/Form';
import BankConnect from '../Components/BankConnect';
import FinancialOverview from '../Components/FinancialOverview';
import TransactionCard from '../Components/TransactionCard';

import { getTransactions } from '../Services/TransactionApis';
import { getAccounts } from '../Services/AccountApis';
import { syncBankData } from '../Services/PluggyApis';


function Dashboard() {

  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {

    async function loadDashboard() {

      setLoading(true);

      try {

        try {

          await syncBankData();

        } catch (error) {

          console.log(
            'Sincronização bancária não realizada:',
            error.message
          );

        }


        const transactionsData =
          await getTransactions();

        const accountsData =
          await getAccounts();


        setTransactions(transactionsData);
        setAccounts(accountsData);

      } catch (error) {

        console.error(
          'Erro ao carregar Dashboard:',
          error
        );

      } finally {

        setLoading(false);

      }

    }


    async function refreshDashboardData() {

      try {

        const transactionsData =
          await getTransactions();

        const accountsData =
          await getAccounts();


        setTransactions(transactionsData);
        setAccounts(accountsData);

      } catch (error) {

        console.error(
          'Erro ao atualizar dados do Dashboard:',
          error
        );

      }

    }


    loadDashboard();


    const interval = setInterval(() => {

      refreshDashboardData();

    }, 30000);


    return () => {

      clearInterval(interval);

    };

  }, []);


  function handleTransactionCreated(newTransaction) {

    setTransactions(previousTransactions => {

      const updatedTransactions = [
        ...previousTransactions,
        newTransaction
      ];


      return updatedTransactions.sort((a, b) => {

        const dateDifference =
          new Date(b.data) -
          new Date(a.data);


        if (dateDifference !== 0) {
          return dateDifference;
        }


        return b.id - a.id;

      });

    });

  }


  return (

    <div className="min-h-screen bg-gray-100 text-gray-800">


      {/* HEADER */}

      <header className="bg-gray-900 px-8 py-8 text-white">

        <div
          className="
            mx-auto
            flex
            w-[90%]
            max-w-6xl
            items-center
            justify-between
          "
        >

          <div>

            <p
              className="
                text-sm
                font-semibold
                uppercase
                tracking-widest
                text-gray-400
              "
            >
              Finance SaaS
            </p>


            <h1 className="text-3xl font-bold">
              Minhas finanças
            </h1>

          </div>


          <BankConnect />

        </div>

      </header>



      {/* CONTEÚDO */}

      <main className="mx-auto w-[90%] max-w-6xl py-10">


        <div
          className="
            grid
            grid-cols-1
            gap-8
            lg:grid-cols-[350px_1fr]
          "
        >


          {/* FORMULÁRIO */}

          <Form
            onTransactionCreated={
              handleTransactionCreated
            }
          />



          {/* TRANSAÇÕES RECENTES */}

          <section
            className="
              rounded-2xl
              bg-white
              p-7
              shadow-sm
            "
          >

            <div
              className="
                mb-6
                flex
                items-center
                justify-between
              "
            >

              <div>

                <p
                  className="
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wider
                    text-gray-500
                  "
                >
                  Histórico
                </p>


                <h2 className="text-2xl font-bold">
                  Transações recentes
                </h2>

              </div>


              <span
                className="
                  rounded-full
                  bg-gray-100
                  px-3
                  py-2
                  text-sm
                "
              >
                {transactions.length}
                {' '}
                transações
              </span>

            </div>



            {loading ? (

              <div
                className="
                  flex
                  items-center
                  gap-3
                  py-10
                  text-gray-500
                "
              >

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

            ) : transactions.length === 0 ? (

              <div
                className="
                  py-10
                  text-center
                  text-gray-500
                "
              >
                Nenhuma transação encontrada.
              </div>

            ) : (

              <div className="flex flex-col gap-3">


                {transactions
                  .slice(0, 5)
                  .map(transaction => (

                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction}
                    />

                  ))}



                <button
                  onClick={() =>
                    navigate(
                      '/transactions',
                      {
                        state: {
                          transactions
                        }
                      }
                    )
                  }
                  className="
                    mt-3
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    py-3
                    font-semibold
                    text-gray-700
                    transition
                    hover:bg-gray-100
                  "
                >
                  Ver todas as transações →
                </button>

              </div>

            )}

          </section>

        </div>



        {/* RESUMO FINANCEIRO */}

        <FinancialOverview
          transactions={transactions}
          accounts={accounts}
        />


      </main>

    </div>

  );

}


export default Dashboard;