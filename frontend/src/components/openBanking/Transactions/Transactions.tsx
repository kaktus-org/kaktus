import React from "react";
import { Transaction, TransactionsProps } from "./Transaction";

export const Transactions: React.FC<TransactionsProps> = ({ data }) => {
    return (
        <ul>
            {data.map((transaction, i) => {
                return <Transaction key={i} transactionData={transaction} />
            })}
        </ul>
    );
};
