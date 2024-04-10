import React from 'react';
import { Grid } from '@mui/material';
import { LineChart, PieChart, BarChart } from '@mui/x-charts';
import { useSelector } from 'react-redux';
import styles from './HistoryCharts.module.scss';
import { selectTransactions } from '../../../store/slices/billSlice';
import { Transaction } from '../../../store/types';

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
  // Создаем массив дат из объектов транзакций
  const dates = transactions.map(transaction => new Date(transaction.date).getMonth());
  const totalAmount = transactions.map(transaction => transaction.totalAmount);

  return (
    <LineChart
      xAxis={[{data: dates}]}
      series={[
        {
          data: totalAmount
        },
      ]}
      width={500}
      height={300}
    />
  )
}

const HistoryCharts = () => {
  const transactions = useSelector(selectTransactions);
  console.log(transactions);

  return (
    <div>
      <HistoryTitle title='123' />
      <HistoryLineChart transactions={transactions} />
      <div>HistoryCharts</div>
    </div>
  );
}

export default HistoryCharts;
