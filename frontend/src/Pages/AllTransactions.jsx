import { useMemo, useState } from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';

import TransactionCard
  from '../Components/TransactionCard';

import TransactionFilters
  from '../Components/TransactionFilters';

import {
  matchesPeriod,
  parseTransactionDate
} from '../Utils/transactionUtils';


function AllTransactions() {

  const location = useLocation();
  const navigate = useNavigate();


  const transactions =
    location.state?.transactions || [];


  const [period, setPeriod] =
    useState('currentMonth');

  const [selectedAccount, setSelectedAccount] =
    useState('all');

  const [
    selectedCategory,
    setSelectedCategory
  ] = useState('all');


  const accounts = useMemo(() => {

    return [
      ...new Set(
        transactions
          .map(transaction =>
            transaction.account_name
          )
          .filter(Boolean)
      )
    ].sort();

  }, [transactions]);


  const categories = useMemo(() => {

    return [
      ...new Set(
        transactions.map(transaction =>
          transaction.category_name ||
          'Sem categoria'
        )
      )
    ].sort();

  }, [transactions]);


  const filteredTransactions = useMemo(() => {

    return transactions.filter(transaction => {

      const transactionDate =
        parseTransactionDate(
          transaction.data
        );


      const periodMatch =
        matchesPeriod(
          transactionDate,
          period
        );


      const accountMatch =
        selectedAccount === 'all' ||
        transaction.account_name ===
          selectedAccount;


      const categoryName =
        transaction.category_name ||
        'Sem categoria';


      const categoryMatch =
        selectedCategory === 'all' ||
        categoryName === selectedCategory;


      return (
        periodMatch &&
        accountMatch &&
        categoryMatch
      );

    });

  }, [
    transactions,
    period,
    selectedAccount,
    selectedCategory
  ]);


  return (

    <div className="min-h-screen bg-gray-100 text-gray-800">

      <header className="bg-gray-900 px-8 py-8 text-white">

        <div className="mx-auto w-[90%] max-w-6xl">

          <button
            onClick={() => navigate(-1)}
            className="
              mb-4
              text-sm
              text-gray-300
              transition
              hover:text-white
            "
          >
            ← Voltar
          </button>


          <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            Finance SaaS
          </p>

          <h1 className="text-3xl font-bold">
            Histórico de transações
          </h1>

        </div>

      </header>


      <main className="mx-auto w-[90%] max-w-6xl py-10">

        <section className="rounded-2xl bg-white p-7 shadow-sm">


          <div className="mb-8">

            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Histórico
            </p>

            <h2 className="text-2xl font-bold">
              Todas as transações
            </h2>

          </div>


          <TransactionFilters
            period={period}
            setPeriod={setPeriod}

            selectedAccount={selectedAccount}
            setSelectedAccount={
              setSelectedAccount
            }

            selectedCategory={
              selectedCategory
            }
            setSelectedCategory={
              setSelectedCategory
            }

            accounts={accounts}
            categories={categories}
          />


          <div className="mb-5">

            <span
              className="
                rounded-full
                bg-gray-100
                px-3
                py-2
                text-sm
              "
            >
              {filteredTransactions.length}
              {' '}
              transações
            </span>

          </div>


          {filteredTransactions.length === 0 ? (

            <div className="py-12 text-center text-gray-500">

              Nenhuma transação encontrada
              com os filtros selecionados.

            </div>

          ) : (

            <div className="flex flex-col gap-3">

              {filteredTransactions.map(
                transaction => (

                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                  />

                )
              )}

            </div>

          )}

        </section>

      </main>

    </div>

  );

}


export default AllTransactions;