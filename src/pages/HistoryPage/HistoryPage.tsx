import LeftSide from '../../components/LeftSide/LeftSide';
import RightSide from '../../components/RightSide/RightSide';
import HistoryList from '../../components/History/HistoryList/HistoryList';
import HistoryCharts from '../../components/History/HistoryCharts/HistoryCharts';
import FriendsHeader from '../../components/Friends/FriendsHeader/FriendsHeader';

import { useEffect, useState } from 'react';
import { supabaseClient } from '../../supabase';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Transaction } from '../../store/types';

const HistoryPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { getToken } = useAuth()
  const user = useUser();
  const userId = user.user ? user.user.id : '';

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const supabaseAccessToken = await getToken({ template: 'supabase' });

        const supabase = await supabaseClient(supabaseAccessToken);

        const { data, error } = await supabase.from('transactions').select('*').eq('user_id', userId)
        if (error) {
          throw error;
        }
        setTransactions(data || null);
      } catch {
        console.error('Error:');
      }
    }
    fetchTransactions();
  }, [getToken, userId])

    return (
        <>
          <LeftSide>
            <FriendsHeader />
            <HistoryList transactions={transactions} />
          </LeftSide>
          <RightSide>
            <HistoryCharts transactions={transactions} />
          </RightSide>
        </>
      );
}

export default HistoryPage