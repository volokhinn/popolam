import styles from './HistoryList.module.scss';
import HistoryItem from '../HistoryItem/HistoryItem';
import { Stack, Skeleton } from '@mui/material';
import { Transaction } from '../../../store/types';

type HistoryListProps = {
  transactions: Transaction[];
};

const HistoryList = ({transactions}: HistoryListProps) => {
  return (
    <div className={styles.main}>
      {transactions.length === 0 && (
        <Stack spacing={2}>
          <Skeleton variant="rounded" width="100%" height={100} sx={{borderRadius: '20px'}} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{borderRadius: '20px'}} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{borderRadius: '20px'}} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{borderRadius: '20px'}} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{borderRadius: '20px'}} />
        </Stack>
      )}
      {transactions.map((transaction, index) => (
        <HistoryItem
          key={index}
          date={transaction.date}
          totalAmount={transaction.totalAmount}
          friendNames={transaction.friendNames}
          details={transaction.details}
          myAmount={transaction.myAmount}
          paidBy={transaction.paidBy}
        />
      ))}
    </div>
  );
};

export default HistoryList;
