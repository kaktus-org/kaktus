import React from 'react'
import { BankAccountData, BankAccount } from './bankAccount';

interface BankAccountsProps {
    data: BankAccountData[]
}

const BankAccounts = ({ data }: BankAccountsProps) => {
    return (
        <div>
            <ul>
                {data.map((account: BankAccountData) => {
                    return <BankAccount bankAccountData={account} />
                })}
            </ul>
        </div>
    );
}

export default BankAccounts