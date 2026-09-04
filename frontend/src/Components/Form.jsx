import { useEffect, useState } from 'react';
import Input from './Input';
import { createTransaction } from '../Services/TransactionApis';
import { getAccounts } from '../Services/AccountApis';
import { getCategories  } from '../Services/CategoryApis';
import  isValidDate  from '../Services/CheckDate';

function Form({ onTransactionCreated }) {



  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState('');

  const [accounts, setAccounts] = useState([]);
  const [accountId, setAccountId] = useState(''); 

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    getAccounts()
      .then(data => {
        setAccounts(data);
      })
      .catch(error => {
        console.error('Erro ao buscar contas:', error);
      });
  }, []);

  useEffect(() => {
    getCategories()
    .then(data =>{
      setCategories(data);
    })
    .catch(error=>{
      console.error('erro ao buscar categoria:', error)
    })
  }, [])


  async function handleSubmit(event) {
    event.preventDefault();

     if (!isValidDate(data)) {
    alert('Data inválida!');
    return;
   }
    const transaction = {
      description,
      amount: Number(amount), 
      data,
      account_id: accountId,
      category_id: categoryId
    };

    try {
      const newTransaction = await createTransaction(transaction);

      if (onTransactionCreated) {
        onTransactionCreated(newTransaction);
      }

      setDescription('');
      setAmount('');
      setData('');
      setAccountId('');
      setCategoryId('');

    } catch (error) {
      console.error('Erro ao criar transação:', error);
    }
  }

  return (
    
    <section className="rounded-2xl bg-white p-7 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Nova movimentação
        </p>

        <h2 className="text-2xl font-bold text-gray-800">
          Adicionar transação
        </h2>
      </div>

    

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        <Input
          label="Descrição"
          placeholder="Ex: Mercado"
          value={description}
          onChange={event =>
            setDescription(event.target.value)
          }
        />

        <Input
          label="Valor"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={event =>
            setAmount(event.target.value)
          }
        />

        <Input
          label="Data"
          type="date"
          value={data}
          onChange={event =>
            setData(event.target.value)
          }
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Conta
          </label>

          <select

            value={accountId}
            onChange={event =>{
              
              setAccountId(Number(event.target.value))

          }
            }
            className="
              rounded-lg
              border
              border-gray-300
              px-4
              py-3
              outline-none
              transition
              focus:border-emerald-500
              focus:ring-2
              focus:ring-emerald-100
            "
            required
          >
            <option value="">
              Selecione uma conta
            </option>
            
            {accounts.map(account => (
              <option
                key={account.id}
                value={account.id}
              >
                {account.name}
              </option>
            ))}
          </select>
        </div>
            
          
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Categoria
          </label>

          <select
            value={categoryId}
            onChange={event =>
              setCategoryId(Number(event.target.value))
            }
            className="
              rounded-lg
              border
              border-gray-300
              px-4
              py-3
              outline-none
              transition
              focus:border-emerald-500
              focus:ring-2
              focus:ring-emerald-100
            "
            required
          >
            <option value="">
              Selecione uma categoria
            </option>

            {categories.map(category => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
            
          


            

        <button
          type="submit"
          className="
            mt-2
            rounded-lg
            bg-emerald-600
            px-4
            py-3
            font-semibold
            text-white
            transition
            hover:bg-emerald-700
            active:scale-[0.99]
          "
        >
          Adicionar transação
        </button>
      </form>
    </section>
  );
}

export default Form;