import React, { useState } from "react";
import api from "api";

interface Transactions {
    data: JSON
}

const TransactionsPage = () => {
    const [transactionData, setTransactionData] = useState('');
    const [error, setError] = useState('');

    const fetchTransactions = async () => {
        try {
            const response: Transactions = await api.get('banking/transactions', true);
            setTransactionData(JSON.stringify(response.data, null, 2));
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
            {transactionData && <pre>{transactionData}</pre>} {/* Display the formatted JSON data */}
        </div>
    );
};

export default TransactionsPage;
