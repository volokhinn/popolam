import { useState } from 'react';
import { LineChart } from '@mui/x-charts';
import styles from './HistoryCharts.module.scss';
import { format } from 'date-fns';
import { Transaction } from '../../../store/types';
import { Select, SelectChangeEvent, MenuItem, InputLabel, FormControl } from '@mui/material';

type HistoryTitleProps = {
  title: string;
};

type ChartProps = {
  transactions: Transaction[];
};

function HistoryTitle({ title }: HistoryTitleProps) {
  return <div className={styles.title}>{title}</div>;
}

function HistoryLineChart({ transactions }: ChartProps) {
  const totalAmountByDate: { [key: string]: number } = {};

  transactions.forEach(transaction => {
    const date = format(new Date(transaction.date), 'MM.dd')
    const amount = transaction.totalAmount;
    totalAmountByDate[date] = (totalAmountByDate[date] || 0) + amount;
  });

  const totalAmount = Object.values(totalAmountByDate);

  const xAxisTransactions = transactions.map((data) => format(data.date, 'dd'));

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

  const [month, setMonth] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
      <HistoryTitle title='График трат по месяцам' />
      <div>
        <FormControl variant="outlined">
          <InputLabel id="month-select-label">Месяц</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              value={month}
              label="Месяц"
              onChange={handleChange}
              className={styles.select_month}
            >
              <MenuItem value={1}>Январь</MenuItem>
              <MenuItem value={2}>Февраль</MenuItem>
              <MenuItem value={3}>Март</MenuItem>
              <MenuItem value={4}>Апрель</MenuItem>
              <MenuItem value={5}>Май</MenuItem>
              <MenuItem value={6}>Июнь</MenuItem>
              <MenuItem value={7}>Июль</MenuItem>
              <MenuItem value={8}>Август</MenuItem>
              <MenuItem value={9}>Сентябрь</MenuItem>
              <MenuItem value={10}>Октябрь</MenuItem>
              <MenuItem value={11}>Ноябрь</MenuItem>
              <MenuItem value={12}>Декабрь</MenuItem>
            </Select>
        </FormControl>
      </div>
      </div>
      <div className={styles.linechart}>
        <HistoryLineChart transactions={transactions} />
      </div>
      <div>HistoryCharts</div>
    </div>
  );
};

export default HistoryCharts;
