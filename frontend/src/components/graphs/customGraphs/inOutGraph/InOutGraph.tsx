import { BarChart } from "components/graphs/barChart"
import { TransactionsProps } from 'components/openBanking/Transactions/Transaction';

const InOutGraph = ({ data }: TransactionsProps) => {
  const income = { name: "income", value: 0 };
  const expense = { name: "expense", value: 0 };

  data.slice(0, 7)
    .forEach((transaction) => {
      if (transaction.amount < 0) {
        income.value += transaction.amount * -1;
      } else {
        expense.value += transaction.amount;
      }
    })


  return (
    <BarChart data={[income, expense]} xkey="name" ykeys={["value"]} />
  )
}

export default InOutGraph