import React from 'react';
import { Grid } from '@mui/material';
import { LineChart, PieChart, BarChart } from '@mui/x-charts';
import { useSelector } from 'react-redux';
import styles from './HistoryCharts.module.scss';
import { selectTransactions } from '../../../store/slices/billSlice';
import { Transaction } from '../../../store/types';
import { format } from 'date-fns';

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

function HistoryPieChart({transactions}:ChartProps) {
  return (
    <div></div>
  )
}

function HistoryLineChart({ transactions }: ChartProps) {
  const totalAmountByDate: { [key: string]: number } = {};

  transactions.forEach(transaction => {
    const date = format(new Date(transaction.date), 'MM.dd')
    const amount = transaction.totalAmount;
    totalAmountByDate[date] = (totalAmountByDate[date] || 0) + amount;
  });
  
  const chartData = Object.keys(totalAmountByDate).map(date => ({
    date: new Date(date),
    totalAmount: totalAmountByDate[date]
  }));
  
  return (
    <LineChart
      xAxis={[{ min: chartData.map(data => data.date)[0], max: chartData.map(data => data.date).pop(), data: chartData.map(data => data.date), valueFormatter: (date) => format(date, 'MM.dd') }]}
      series={[
        {
          data: chartData.map(data => data.totalAmount),
        },
      ]}
      width={400}
      height={400}
      colors={['#E52F5B']}
    />
  );
}

const HistoryCharts = () => {
  const transactions = useSelector(selectTransactions);

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
