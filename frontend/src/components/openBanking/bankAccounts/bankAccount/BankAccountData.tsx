export default interface BankAccountData {
    account_id: string,
    balances: {
        available: null | number,
        current: number,
        iso_currency_code: string,
        limit: null | number,
        unofficial_currency_code: null | string,
    },
    mask: string,
    name: string,
    official_name: string,
    subtype: string,
    type: string,
}