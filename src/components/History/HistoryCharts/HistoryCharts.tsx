import { LineChart } from '@mui/x-charts';
import styles from './HistoryCharts.module.scss';
import { format } from 'date-fns';
import { Transaction } from '../../../store/types';

type HistoryTitleProps = {
  title: string;
};

type ChartProps = {
  transactions: Transaction[];
};

function HistoryTitle({ title }: HistoryTitleProps) {
  return <div>{title}</div>;
}

function HistoryLineChart({ transactions }: ChartProps) {
  const totalAmountByDate: { [key: string]: number } = {};

  transactions.forEach(transaction => {
    const date = format(new Date(transaction.date), 'MM.dd')
    const amount = transaction.totalAmount;
    totalAmountByDate[date] = (totalAmountByDate[date] || 0) + amount;
  });

  const totalAmount = Object.values(totalAmountByDate);

  const xAxisTransactions = transactions.map((data) => format(data.date, 'dd.MM'));

  return (
    <LineChart
      xAxis={[{ data: xAxisTransactions, tickInterval: xAxisTransactions }]}
      series={[{ data: totalAmount }]}
      width={1000}
      height={400}
      colors={['#E52F5B']}
    />
  );
}

type HistoryChartsProps = {
  transactions: Transaction[];
}

const HistoryCharts = ({transactions}: HistoryChartsProps) => {

  return (
    <div>
      <HistoryTitle title='123' />
      <div className={styles.linechart}>
        <HistoryLineChart transactions={transactions} />
      </div>
      <div>HistoryCharts</div>
    </div>
  );
};

export default HistoryCharts;
