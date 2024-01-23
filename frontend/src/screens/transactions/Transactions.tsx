import React, { useState } from "react";
import Transaction from "./Transaction";
import { TransactionData } from "./Transaction";
import api from "api";

interface AccountData {
    added: any[]
}


interface Transactions {
    data: AccountData[]
}

const TransactionsPage = () => {
    const [transactionData, setTransactionData] = useState<AccountData[]>([]);
    const [error, setError] = useState('');

    const fetchTransactions = async () => {
        try {
            const response: Transactions = await api.get('banking/transactions', true);
            console.log(response);
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
                <ul>
                    {transactionData.map((account) => {
                        return <ul>
                            {account.added.map((transaction: TransactionData) => {
                                return <Transaction transactionData={transaction} />
                            })}
                        </ul>
                    })}
                    {/* <pre>{JSON.stringify(transactionData, null, 2)}</pre> */}
                </ul>
            }
        </div>
    );
};

export default TransactionsPage;
