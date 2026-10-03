import { parseTransactionDate } from '../Utils/transactionUtils';


function TransactionCard({ transaction }) {

  return (

    <div
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

  );

}

export default TransactionCard;