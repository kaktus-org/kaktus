import { LineGraph } from 'components/graphs/lineGraph';
import { TransactionsProps } from 'components/openBanking/Transactions/Transaction';

const BalanceTimeGraph = ({ data }: TransactionsProps) => {
    let accumulatedData = data.sort((a, b) => (a.date < b.date) ? -1 : 1)
        .reduce((accumulator: any[], val) => {
            let amount = (accumulator.length > 0 ? accumulator[accumulator.length - 1].amount - val.amount : - val.amount)
            accumulator.push({ date: val.date, amount: amount })
            return accumulator
        }, []);


    return (
        <LineGraph data={accumulatedData.slice(-8, -1)} xkey='date' ykeys={['amount']} colors={["#358f3B"]} legend={true} tooltip={true} grid={true} />
    )
}

export default BalanceTimeGraph