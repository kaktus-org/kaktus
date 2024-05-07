import { PieChart } from "components/graphs/pieChart"
import { TransactionsProps } from 'components/openBanking/Transactions/Transaction';

const CategoriesGraph = ({ data }: TransactionsProps) => {
    const dataByPrimaryGroup: any = {}
    data.forEach((transaction) => {
        if (dataByPrimaryGroup[transaction.personal_finance_category.primary]) {
            dataByPrimaryGroup[transaction.personal_finance_category.primary] += 1;
        } else {
            dataByPrimaryGroup[transaction.personal_finance_category.primary] = 1;
        }
    });

    const categoriesByCount: any[] = Object.entries(dataByPrimaryGroup).map(([category, count]) => {
        return { name: category, value: count }
    });

    return (
        <PieChart data={categoriesByCount} dataKey="value" nameKey="name" />
    )
}

export default CategoriesGraph