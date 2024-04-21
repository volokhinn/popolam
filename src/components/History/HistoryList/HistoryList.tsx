import styles from './HistoryList.module.scss';
import HistoryItem from '../HistoryItem/HistoryItem';
import { Stack, Skeleton } from '@mui/material';
import { Transaction } from '../../../store/types';
import { useState, useEffect } from 'react';
import { useAppContext } from '../../../AppContext';

type HistoryListProps = {
  transactions: Transaction[];
};

const HistoryList = ({transactions}: HistoryListProps) => {

  const [showSkeleton, setShowSkeleton] = useState(true);

  const { fetchTransactions, supabase } = useAppContext();

  useEffect(() => {
    if (supabase) {
      fetchTransactions();
      setTimeout(() => {
        setShowSkeleton(false);
      }, 600);
    }
  }, [fetchTransactions, supabase]);

  return (
    <div className={styles.main}>
      {showSkeleton && (
        <Stack spacing={2}>
          <Skeleton variant="rounded" width="100%" height={100} sx={{ borderRadius: '20px' }} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{ borderRadius: '20px' }} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{ borderRadius: '20px' }} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{ borderRadius: '20px' }} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{ borderRadius: '20px' }} />
        </Stack>
      )}
      {!showSkeleton && (
        <>
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
        </>
      )}
    </div>
  );
};

export default HistoryList;
