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
  
  const dates = Object.keys(totalAmountByDate).map(date => new Date(date));
  const totalAmount = Object.values(totalAmountByDate);

  return (
    <LineChart
      xAxis={[{ data: dates, valueFormatter: (date) => format(new Date(date), 'MM.dd') }]}
      series={[
        {
          data: totalAmount,
        },
      ]}
      width={600}
      height={400}
    />
  );
}

const HistoryCharts = () => {
  const transactions = useSelector(selectTransactions);

  return (
    <div>
      <HistoryTitle title='123' />
      <HistoryLineChart transactions={transactions} />
      <div>HistoryCharts</div>
    </div>
  );
}

export default HistoryCharts;
