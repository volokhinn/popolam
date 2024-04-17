import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { LineChart, PieChart, BarChart } from '@mui/x-charts';
import styles from './HistoryCharts.module.scss';
import { Transaction } from '../../../store/types';
import { format } from 'date-fns';

import supabase from '../../../supabase';

type HistoryTitleProps = {
  title: string
}

type ChartProps = {
  transactions: Transaction[]
}

function HistoryTitle({title}:HistoryTitleProps) {
  return (
    <div>{title}</div>
  );
}

function HistoryLineChart({ transactions }: ChartProps) {
  
  return (
    <LineChart
      xAxis={[{ data: transactions.map(data => data.date)}]}
      series={[
        {
          data: transactions.map(data => data.totalAmount),
        },
      ]}
      width={400}
      height={400}
      colors={['#E52F5B']}
    />
  );
}

const HistoryCharts = () => {

  const [transactions, setTransactions] = useState<any[]>([])
  console.log(transactions);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data, error } = await supabase.from('transactions').select('*')
        if (error) {
          throw error;
        }
        setTransactions(data || null);
      } catch {
        console.error('Error:');
      }
    }
    fetchTransactions();
  }, [])

  return (
    <div>
      <HistoryTitle title='123' />
      <div className={styles.linechart}>
        <HistoryLineChart transactions={transactions} />
      </div>
      <div>HistoryCharts</div>
    </div>
  );
}

export default HistoryCharts;
