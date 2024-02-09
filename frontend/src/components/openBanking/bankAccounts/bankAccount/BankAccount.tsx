import React from 'react'
import BankAccountData from './BankAccountData'

interface BankAccountProps {
    bankAccountData: BankAccountData
}

const BankAccount = ({ bankAccountData }: BankAccountProps) => {
    const getCurrencySymbol = () => {
        // TODO: Implement propper ccy code -> symbol
        switch (bankAccountData.balances.iso_currency_code) {
            case 'USD':
                return '$';
            case 'EUR':
                return '€';
            case 'GBP':
                return '£';
            default:
                return bankAccountData.balances.iso_currency_code;
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 p-8 rounded-lg shadow-md text-white mb-4">
            <h2 className="text-5xl font-bold mb-4">{bankAccountData.name}</h2>
            <p className="text-lg mb-2">{bankAccountData.official_name}</p>
            <p className="text-3xl font-bold mb-4">
                Balance: {getCurrencySymbol()}
                {bankAccountData.balances.current}
            </p>
            {bankAccountData.balances.available &&
                <p className="text-lg mb-2">Available Balance: {getCurrencySymbol()} {bankAccountData.balances.available}</p>
            }
            <p className="text-lg mb-2">Masked Number: {bankAccountData.mask}</p>
            <p className="text-lg mb-2">Account Type: {bankAccountData.type}</p>
            <p className="text-lg mb-2">Subtype: {bankAccountData.subtype}</p>
            {bankAccountData.balances.limit && (
                <p className="text-lg mb-2">Credit Limit: {getCurrencySymbol()} {bankAccountData.balances.limit}</p>
            )}
        </div>
    )
}

export default BankAccount