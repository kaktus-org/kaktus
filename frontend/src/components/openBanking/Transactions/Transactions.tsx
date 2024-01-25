import React from "react";
import { Transaction, TransactionData } from "./Transaction";

interface AccountData {
    added: any[]
}

interface TransactionsProps {
    data: AccountData[];
}

export const Transactions: React.FC<TransactionsProps> = ({ data }) => {
    return (
        <div>
            <ul>
                {data.map((account) => {
                    return <ul>
                        {account.added.map((transaction: TransactionData) => {
                            return <Transaction transactionData={transaction} />
                        })}
                    </ul>
                })}
            </ul>
        </div>
    );
};
