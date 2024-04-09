import styles from './HistoryList.module.scss';
import HistoryItem from '../HistoryItem/HistoryItem';
import { useSelector } from 'react-redux';
import { selectTransactions } from '../../../store/slices/billSlice';

const HistoryList = () => {
    const transactions = useSelector(selectTransactions);
    
  return (
    <div className={styles.main}>
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
