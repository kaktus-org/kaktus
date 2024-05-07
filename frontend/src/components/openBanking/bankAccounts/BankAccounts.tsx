import { BankAccountData, BankAccount } from './bankAccount';

interface BankAccountsProps {
    data: BankAccountData[]
}

const BankAccounts = ({ data }: BankAccountsProps) => {
    return (
        <div>
            {data &&
                <ul>
                    {data.map((account: BankAccountData) => {
                        return <li key={account.account_id}>
                            <BankAccount bankAccountData={account} />
                        </li>
                    })}
                </ul>
            }
            {!data &&
                "Error fetching Bank details"
            }
        </div>
    );
}

export default BankAccounts