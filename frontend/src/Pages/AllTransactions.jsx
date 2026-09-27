import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function AllTransactions() {

  const location = useLocation();
  const navigate = useNavigate();

  const transactions = location.state?.transactions || [];

  const [period, setPeriod] = useState('currentMonth');


  function parseTransactionDate(value) {

    if (
      typeof value === 'string' &&
      /^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {

      const [year, month, day] = value.split('-').map(Number);

      return new Date(
        year,
        month - 1,
        day
      );
    }

    return new Date(value);
  }


  const filteredTransactions = useMemo(() => {

    const now = new Date();

    return transactions.filter(transaction => {

      const transactionDate = parseTransactionDate(transaction.data);


      if (period === 'all') {
        return true;
      }


      if (period === 'currentMonth') {

        return (
          transactionDate.getMonth() === now.getMonth() &&

          transactionDate.getFullYear() === now.getFullYear()
        );

      }


      if (period === 'lastMonth') {

        const lastMonth =
          new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1
          );

        return (
          transactionDate.getMonth() === lastMonth.getMonth() &&

          transactionDate.getFullYear() === lastMonth.getFullYear()
        );

      }


      if (period === 'last30Days') {

        const thirtyDaysAgo =
          new Date();

        thirtyDaysAgo.setDate(
          now.getDate() - 30
        );

        return (
          transactionDate >= thirtyDaysAgo &&
          transactionDate <= now
        );

      }


      if (period === 'last3Months') {

        const threeMonthsAgo =
          new Date();

        threeMonthsAgo.setMonth(
          now.getMonth() - 3
        );

        return (
          transactionDate >= threeMonthsAgo &&
          transactionDate <= now
        );

      }


      if (period === 'currentYear') {

        return (
          transactionDate.getFullYear() ===
          now.getFullYear()
        );

      }


      return true;

    });

  }, [transactions, period]);


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

          <div
            className="
              mb-8
              flex
              flex-col
              gap-4
              md:flex-row
              md:items-center
              md:justify-between
            "
          >

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Histórico
              </p>

              <h2 className="text-2xl font-bold">
                Todas as transações
              </h2>

            </div>


            <div className="flex items-center gap-3">

              <label
                htmlFor="period"
                className="text-sm font-semibold"
              >
                Período:
              </label>

              <select
                id="period"
                value={period}
                onChange={event =>
                  setPeriod(event.target.value)
                }
                className="
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-2
                  outline-none
                  focus:border-gray-500
                "
              >

                <option value="currentMonth">
                  Mês atual
                </option>

                <option value="lastMonth">
                  Mês passado
                </option>

                <option value="last30Days">
                  Últimos 30 dias
                </option>

                <option value="last3Months">
                  Últimos 3 meses
                </option>

                <option value="currentYear">
                  Este ano
                </option>

                <option value="all">
                  Todas as transações
                </option>

              </select>

            </div>

          </div>


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
              {filteredTransactions.length} transações
            </span>

          </div>


          {filteredTransactions.length === 0 ? (

            <div className="py-12 text-center text-gray-500">

              Nenhuma transação encontrada
              para esse período.

            </div>

          ) : (

            <div className="flex flex-col gap-3">

              {filteredTransactions.map(transaction => (

                <div
                  key={transaction.id}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-gray-200
                    p-4
                    transition
                    hover:shadow-md
                  "
                >

                  <div>

                    <h3 className="font-semibold">
                      {transaction.description}
                    </h3>

                    <p className="text-sm text-gray-500">

                      {parseTransactionDate(
                        transaction.data
                      ).toLocaleDateString('pt-BR')}

                    </p>

                  </div>


                  <div className="text-right">

                    <strong>
                      R$ {Number(
                        transaction.amount
                      ).toFixed(2)}
                    </strong>

                    <p className="text-xs text-gray-400">

                      Conta {transaction.account_name}

                      {' • '}

                      Categoria {
                        transaction.category_name ||
                        'Sem categoria'
                      }

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

export default AllTransactions;