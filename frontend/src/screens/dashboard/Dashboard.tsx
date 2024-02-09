import React, { useEffect, useState } from 'react';
import api from "api";
import { Transactions } from "components/openBanking/Transactions";
import { BankAccounts } from "components/openBanking/bankAccounts";
import { PairBankButton, RePairBankButton, IncomeVerificationButton, PairLiabilityButton } from 'components/openBanking/OpenBanking';

interface AllTransactionData {
    data: AccountTransactionData[]
}

interface AccountTransactionData {
    added: any[]
}

interface AllBankAccountData {
    data: BankAccountData[]
}

interface BankAccountData {
    accounts: any[]
}

function DashboardPage() {
    const [userEmail, setUserEmail] = useState('');
    const [transactionData, setTransactionData] = useState<AccountTransactionData[] | null>(null);
    const [BankAccountData, setBankAccountData] = useState<BankAccountData[] | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBankAccounts();
        fetchTransactions();
        const email = localStorage.getItem('userEmail');
        if (email) {
            setUserEmail(email);
        }
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

    const fetchBankAccounts = async () => {
        try {
            const response: AllBankAccountData = await api.get('banking/account-info');
            setBankAccountData(response.data);
        } catch (err) {
            console.error('Error fetching Accounts:', err);
            setError('Failed to retrieve Accounts. Please make sure you are logged in.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-lg">
                <h2 className="text-3xl font-semibold mb-4">Welcome, {userEmail}!</h2>

                <div className="mb-8 shadow-lg p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Bank Accounts</h3>
                    {!BankAccountData && !error && <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full border-t-4 border-hunterGreen border-solid h-12 w-12"></div>
                    </div>}
                    {error && <div>Error: {error}</div>}
                    {BankAccountData &&
                        <div>
                            <ul>
                                {BankAccountData.slice(0, 2).map((accounts: BankAccountData) => {
                                    return <BankAccounts data={accounts.accounts} />
                                })}
                            </ul>
                        </div>}
                </div>

                <div className="mb-8 shadow-lg p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
                    {!transactionData && !error && <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full border-t-4 border-hunterGreen border-solid h-12 w-12"></div>
                    </div>}
                    {error && <div>Error: {error}</div>}
                    {transactionData &&
                        <div>
                            <ul>
                                {transactionData.slice(0, 1).map((transactions: AccountTransactionData) => {
                                    return <Transactions data={transactions.added.slice(0, 3)} />
                                })}
                            </ul>
                        </div>}
                </div>

                <div className='shadow-lg p-4 rounded-lg'>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <PairBankButton />
                    <IncomeVerificationButton />
                    <PairLiabilityButton />
                    <RePairBankButton />
                    <ul className="flex flex-wrap gap-4">
                        <li className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600 transition">
                            View Transactions
                        </li>
                        <li className="bg-green-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-600 transition">
                            Transfer Money
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage