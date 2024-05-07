import { useEffect, useState } from 'react';
import api from "api";
import { AccumulativeExpensebyCategoryTimeGraph, BalanceTimeGraph, CategoriesGraph, InOutGraph } from 'components/graphs';

interface AllTransactionData {
  data: AccountTransactionData[]
}

interface AccountTransactionData {
  added: any[]
}

const Charts = () => {
  const [transactionData, setTransactionData] = useState<AccountTransactionData[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response: AllTransactionData = await api.get('banking/transactions');
      setTransactionData(response.data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to retrieve transactions. Please make sure you are logged in.');
    }
  };

  return (
    <div className='flex flex-wrap p-4'>

      <div className="mb-8 shadow-lg p-4 m-2 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Expenditure by Category Over Time</h3>
        {!transactionData && !error && <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full border-t-4 border-hunterGreen border-solid h-12 w-12"></div>
        </div>}
        {error && <div>Error: {error}</div>}
        {transactionData &&
          <ul>
            {transactionData.slice(0, 1).map((transactions, i) => {
              if (transactions.added) {
                return <AccumulativeExpensebyCategoryTimeGraph key={i} data={transactions.added} />
              } else {
                return "Error fetching transactions"
              }
            })}
          </ul>}
      </div>

      <div className="mb-8 shadow-lg p-4 m-2 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Income vs Expenditure</h3>
        {!transactionData && !error && <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full border-t-4 border-hunterGreen border-solid h-12 w-12"></div>
        </div>}
        {error && <div>Error: {error}</div>}
        {transactionData &&
          <ul>
            {transactionData.slice(0, 1).map((transactions, i) => {
              if (transactions.added) {
                return <InOutGraph key={i} data={transactions.added} />
              } else {
                return "Error fetching transactions"
              }
            })}
          </ul>}
      </div>

      <div className="mb-8 shadow-lg p-4 m-2 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Spending Volume Categories</h3>
        {!transactionData && !error && <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full border-t-4 border-hunterGreen border-solid h-12 w-12"></div>
        </div>}
        {error && <div>Error: {error}</div>}
        {transactionData &&
          <ul>
            {transactionData.slice(0, 1).map((transactions, i) => {
              if (transactions.added) {
                return <CategoriesGraph key={i} data={transactions.added} />
              } else {
                return "Error fetching transactions"
              }
            })}
          </ul>}
      </div>

      <div className="mb-8 shadow-lg p-4 m-2 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Balance Graph</h3>
        {!transactionData && !error && <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full border-t-4 border-hunterGreen border-solid h-12 w-12"></div>
        </div>}
        {error && <div>Error: {error}</div>}
        {transactionData &&
          <ul>
            {transactionData.slice(0, 1).map((transactions, i) => {
              if (transactions.added) {
                return <BalanceTimeGraph key={i} data={transactions.added} />
              } else {
                return "Error fetching transactions"
              }
            })}
          </ul>}
      </div>
    </div>
  )
}

export default Charts