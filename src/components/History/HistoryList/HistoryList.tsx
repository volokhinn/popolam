import { useState, useEffect } from 'react';
import styles from './HistoryList.module.scss';
import HistoryItem from '../HistoryItem/HistoryItem';
import { Stack, Skeleton } from '@mui/material';

import {supabaseClient} from '../../../supabase';
import { useAuth } from '@clerk/clerk-react';
import { Transaction } from '../../../store/types';

const HistoryList = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const { getToken } = useAuth()
    
    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const supabaseAccessToken = await getToken({ template: 'supabase' });

          const supabase = await supabaseClient(supabaseAccessToken);

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
    }, [getToken])
    
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
