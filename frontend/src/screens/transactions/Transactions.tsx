import React, { useState } from "react";
import { api } from "api";
import qs from "qs";

const TransactionsPage = () => {
    const [transactionData, setTransactionData] = useState('');
    const [error, setError] = useState('');

    const handleFetchTransactions = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // TODO: find a better way to do this for practical implementations of accessing protected routes.
            } else {
                throw new Error('Authentication token not found');
            }

            const response = await api.get('banking/transactions');
            setTransactionData(JSON.stringify(response.data, null, 2));
        } catch (err) {
            console.error('Error fetching transactions:', err);
            setError('Failed to retrieve transactions. Please make sure you are logged in.');
        }
    };

    return (
        <div>
            <h1>Transactions</h1>
            <button onClick={handleFetchTransactions}>Fetch Transactions</button>
            {error && <div>Error: {error}</div>}
            {transactionData && <pre>{transactionData}</pre>} {/* Display the formatted JSON data */}
        </div>
    );
};

export default TransactionsPage;
