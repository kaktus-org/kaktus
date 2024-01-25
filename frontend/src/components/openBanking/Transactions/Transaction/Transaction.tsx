import "./Transaction.css";
import { TransactionData } from "./";

interface TransactionProps {
    transactionData: TransactionData
}

export const Transaction = ({ transactionData }: TransactionProps) => {

    return (
        <div className="container-panel">
            <div className="logo-container">
                <img src={transactionData.logo_url} alt="Merchant Logo" className="w-12 h-12" />
                {transactionData.personal_finance_category_icon_url && (
                    <div className="icon-container">
                        <img src={transactionData.personal_finance_category_icon_url} alt="Category Icon" />
                    </div>
                )}
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4">{transactionData.name}</h2>
                <p className="text-lg">Amount: {transactionData.amount}</p>
                <p className="text-lg">Date: {transactionData.date}</p>
                <p className="text-lg">Merchant: {transactionData.merchant_name}</p>
                <p className="text-lg">Transaction Type: {transactionData.transaction_type}</p>
            </div>
        </div>
    );
};


