import { useEffect, useState } from 'react';



function App() {
  const [transactions, setTransections] = useState([])

  useEffect( () =>{
     fetch('http://localhost:3000/transactions')
        .then(response => response.json())
        .then(data=> {
            setTransections(data)
          })
        .catch(
          error => {console.error("erro na transação")
  })
  }, [] )


  return (
    <div>

    {transactions.map(transaction => (
      <div key={transaction.id}>
    <h2>{transaction.description}</h2>
    <h2>R$ {transaction.amount}</h2>
    <h2>{transaction.data}</h2>
    <h2>{transaction.account_id}</h2>
    <h2>{transaction.category_id}</h2>
  </div>
))}
</div>
  )
}
export default App