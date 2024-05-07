import { AreaGraph } from "components/graphs/areaGraph"
import { TransactionsProps } from "components/openBanking/Transactions/Transaction";

const AccumulativeExpensebyCategoryTimeGraph = ({ data }: TransactionsProps) => {
    let categories = data.map((v) => {
        return v.personal_finance_category.primary;
    }).filter((value, index, self) => self.indexOf(value) === index);

    const defaultTotal: any = {};
    categories.forEach((value) => { defaultTotal[value] = 0 });

    let accumulatedData = data.sort((a, b) => (a.date < b.date) ? -1 : 1)
        .reduce((accumulator: any[], val) => {
            let total = structuredClone(accumulator[accumulator.length - 1]) ?? defaultTotal
            if (val.amount > 0) {
                total.date = val.date;
                total[val.personal_finance_category.primary] = (total[val.personal_finance_category.primary] ?? 0) + val.amount;
                accumulator.push(total)
            }
            return accumulator
        }, []);

    return (
        <AreaGraph xkey="date" ykeys={categories} data={accumulatedData.slice(0, 10)} />
    )
}

export default AccumulativeExpensebyCategoryTimeGraph