import { useState } from 'react';
import { LineChart } from '@mui/x-charts';
import styles from './HistoryCharts.module.scss';
import { format, getMonth } from 'date-fns';
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
    const date = format(new Date(transaction.date), 'dd.MM');
    const amount = transaction.totalAmount;
    totalAmountByDate[date] = (totalAmountByDate[date] || 0) + amount;
  });

  const totalAmount = Object.values(totalAmountByDate);
  const xAxisTransactions = Object.keys(totalAmountByDate);

  return (
    <LineChart
      xAxis={[{ data: xAxisTransactions }]}
      series={[{ data: totalAmount }]}
      width={900}
      height={400}
      colors={['#E52F5B']}
      
    />
  );
}

type HistoryChartsProps = {
  transactions: Transaction[];
};

const HistoryCharts = ({ transactions }: HistoryChartsProps) => {
  const [month, setMonth] = useState<number>(getMonth(new Date()) + 1);

  const handleChange = (event: SelectChangeEvent<number>) => {
    setMonth(event.target.value as number);
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const filteredTransactions = transactions.filter(transaction => getMonth(new Date(transaction.date)) + 1 === month);

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
              {months.map(month => (
                <MenuItem key={month} value={month}>{format(new Date(0, month - 1), 'LLLL')}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={styles.linechart}>
        {filteredTransactions.length > 0 ? (
          <HistoryLineChart transactions={filteredTransactions} />
        ) : (
          <div className={styles.nodata}>
            Нет данных за выбранный месяц
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryCharts;