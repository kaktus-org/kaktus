export interface TransactionData {
    account_id: string,
    account_owner: string,
    amount: number,
    authorized_date: string,
    authorized_datetime: string,
    category: string[],
    category_id: string,
    check_number: string,
    counterparties: any[],
    date: string,
    datetime: string,
    iso_currency_code: string,
    location: any,
    logo_url: string,
    merchant_entity_id: string,
    merchant_name: string,
    name: string,
    payment_channel: string,
    payment_meta: any,
    pending: boolean,
    pending_transaction_id: string,
    personal_finance_category: any,
    personal_finance_category_icon_url: string,
    transaction_code: string,
    transaction_id: string,
    transaction_type: string,
    unofficial_currency_code: string,
    website: string
}

export interface TransactionsProps {
    data: TransactionData[];
}