import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts';
import styles from './HistoryCharts.module.scss';
import { Transaction } from '../../../store/types';
import { format } from 'date-fns';
import { supabaseClient } from '../../../supabase';
import { useAuth } from '@clerk/clerk-react';

type HistoryChartsProps = {
  title: string;
};

type ChartProps = {
  transactions: Transaction[];
};

function HistoryTitle({ title }: HistoryChartsProps) {
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

  console.log(transactions.map((data) => format(data.date, 'dd.MM')))
  return (
    <LineChart
      xAxis={[{ data: transactions.map((data) => format(data.date, 'dd.MM'))}]}
      series={[{ data: totalAmount }]}
      width={1000}
      height={400}
      colors={['#E52F5B']}
    />
  );
}

const HistoryCharts = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const supabaseAccessToken = await getToken({ template: 'supabase' });
        const supabase = await supabaseClient(supabaseAccessToken);
        const { data, error } = await supabase.from('transactions').select('*');
        if (error) {
          throw error;
        }
        setTransactions(data || []);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchTransactions();
  }, [getToken]);

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
