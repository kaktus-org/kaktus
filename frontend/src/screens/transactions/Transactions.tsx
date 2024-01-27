import { useState } from "react";
import api from "api";
import { Transactions } from "components/openBanking/Transactions";

interface AccountTransactionData {
    data: any[]
}

const TransactionsPage = () => {
    const [transactionData, setTransactionData] = useState<any[]>([]);
    const [error, setError] = useState('');

    const fetchTransactions = async () => {
        try {
            const response: AccountTransactionData = await api.get('banking/transactions');
            setTransactionData(response.data);
        } catch (err) {
            console.error('Error fetching transactions:', err);
            setError('Failed to retrieve transactions. Please make sure you are logged in.');
        }
    };

    return (
        <div>
            <h1>Transactions</h1>
            <button onClick={fetchTransactions}>Fetch Transactions</button>
            {error && <div>Error: {error}</div>}
            {transactionData &&
                <Transactions data={transactionData} />
            }
        </div>
    );
};

export default TransactionsPage;
