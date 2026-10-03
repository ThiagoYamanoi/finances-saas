function TransactionFilters({
  period,
  setPeriod,
  selectedAccount,
  setSelectedAccount,
  selectedCategory,
  setSelectedCategory,
  accounts,
  categories
}) {

  return (

    <div
      className="
        mb-8
        grid
        grid-cols-1
        gap-4
        md:grid-cols-3
      "
    >

      <div>

        <label
          htmlFor="period"
          className="mb-2 block text-sm font-semibold"
        >
          Período
        </label>

        <select
          id="period"
          value={period}
          onChange={event =>
            setPeriod(event.target.value)
          }
          className="
            w-full
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
            Todas
          </option>

        </select>

      </div>


      <div>

        <label
          htmlFor="account"
          className="mb-2 block text-sm font-semibold"
        >
          Conta
        </label>

        <select
          id="account"
          value={selectedAccount}
          onChange={event =>
            setSelectedAccount(
              event.target.value
            )
          }
          className="
            w-full
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

          <option value="all">
            Todas as contas
          </option>

          {accounts.map(account => (

            <option
              key={account}
              value={account}
            >
              {account}
            </option>

          ))}

        </select>

      </div>


      <div>

        <label
          htmlFor="category"
          className="mb-2 block text-sm font-semibold"
        >
          Categoria
        </label>

        <select
          id="category"
          value={selectedCategory}
          onChange={event =>
            setSelectedCategory(
              event.target.value
            )
          }
          className="
            w-full
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

          <option value="all">
            Todas as categorias
          </option>

          {categories.map(category => (

            <option
              key={category}
              value={category}
            >
              {category}
            </option>

          ))}

        </select>

      </div>

    </div>

  );

}

export default TransactionFilters;