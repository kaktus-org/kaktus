import React from "react";
import { Transaction, TransactionData } from "./Transaction";

interface TransactionsProps {
    data: TransactionData[];
}

export const Transactions: React.FC<TransactionsProps> = ({ data }) => {
    return (
        <div>
            <ul>
                {data.map((transaction: TransactionData) => {
                    return <Transaction transactionData={transaction} />
                })}
            </ul>
        </div>
    );
};
