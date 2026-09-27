import { useMemo } from 'react';


const BALANCE_ACCOUNT_TYPES = new Set([
  'CHECKING',
  'CHECKING_ACCOUNT',
  'BANK',
  'SAVINGS',
  'SAVINGS_ACCOUNT'
]);


const ACCOUNT_TYPE_LABELS = {
  CHECKING: 'Conta corrente',
  CHECKING_ACCOUNT: 'Conta corrente',
  BANK: 'Conta bancária',
  SAVINGS: 'Poupança',
  SAVINGS_ACCOUNT: 'Poupança',
  CREDIT: 'Cartão de crédito'
};


function formatCurrency(value) {

  return new Intl.NumberFormat(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL'
    }
  ).format(value);

}


function getAccountType(account) {

  return account.type?.toUpperCase() || '';

}


function getAccountTypeLabel(type) {

  const normalizedType =
    type?.toUpperCase();

  return (
    ACCOUNT_TYPE_LABELS[normalizedType] ||
    type ||
    'Tipo não informado'
  );

}


function isCurrentMonth(dateValue) {

  const transactionDate =
    new Date(dateValue);

  const now =
    new Date();

  return (
    transactionDate.getMonth() === now.getMonth() &&
    transactionDate.getFullYear() === now.getFullYear()
  );

}


function SummaryCard({ title, value }) {

  return (

    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <p className="text-sm font-semibold text-gray-500">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        {formatCurrency(value)}
      </h3>

    </div>

  );

}


function FinancialOverview({ transactions, accounts }) {

  const financialSummary = useMemo(() => {

    const monthSummary =
      transactions.reduce(
        (summary, transaction) => {

          if (!isCurrentMonth(transaction.data)) {
            return summary;
          }


          const amount =
            Number(transaction.amount);


          if (amount > 0) {

            summary.income += amount;

          } else if (amount < 0) {

            summary.expenses += Math.abs(amount);

          }


          return summary;

        },
        {
          income: 0,
          expenses: 0
        }
      );


    const balanceAccounts =
      accounts.filter(account =>
        BALANCE_ACCOUNT_TYPES.has(
          getAccountType(account)
        )
      );


    const balance =
      balanceAccounts.reduce(
        (total, account) =>
          total + Number(account.balance || 0),
        0
      );


    return {

      balance,

      income:
        monthSummary.income,

      expenses:
        monthSummary.expenses,

      result:
        monthSummary.income -
        monthSummary.expenses,

      balanceAccounts

    };

  }, [transactions, accounts]);


  const summaryCards = [

    {
      title: 'Saldo atual',
      value: financialSummary.balance
    },

    {
      title: 'Receitas do mês',
      value: financialSummary.income
    },

    {
      title: 'Despesas do mês',
      value: financialSummary.expenses
    },

    {
      title: 'Resultado do mês',
      value: financialSummary.result
    }

  ];


  return (

    <section className="mt-8">

      <div className="mb-5">

        <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Resumo
        </p>

        <h2 className="text-2xl font-bold">
          Visão financeira
        </h2>

      </div>


      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {summaryCards.map(card => (

          <SummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
          />

        ))}

      </div>


      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-5">

          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Contas
          </p>

          <h3 className="text-xl font-bold">
            Saldo por conta
          </h3>

        </div>


        {financialSummary.balanceAccounts.length === 0 ? (

          <p className="text-gray-500">
            Nenhuma conta com saldo disponível encontrada.
          </p>

        ) : (

          <div className="flex flex-col gap-3">

            {financialSummary.balanceAccounts.map(account => (

              <div
                key={account.id}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-gray-200
                  p-4
                "
              >

                <div>

                  <p className="font-semibold">
                    {account.name}
                  </p>

                  <p className="text-sm text-gray-500">

                    {getAccountTypeLabel(
                      account.type
                    )}

                  </p>

                </div>


                <strong>

                  {formatCurrency(
                    Number(account.balance || 0)
                  )}

                </strong>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

}


export default FinancialOverview;