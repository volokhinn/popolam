import LeftSide from '../../components/LeftSide/LeftSide';
import RightSide from '../../components/RightSide/RightSide';
import HistoryList from '../../components/History/HistoryList/HistoryList';
import HistoryCharts from '../../components/History/HistoryCharts/HistoryCharts';
import FriendsHeader from '../../components/Friends/FriendsHeader/FriendsHeader';
import Hint from '../../components/Hint/Hint';
import { useAppContext } from '../../AppContext';

const HistoryPage = () => {
  const { transactions } = useAppContext();

    return (
        <>
          <LeftSide>
            <FriendsHeader />
            <HistoryList transactions={transactions} />
          </LeftSide>
          <RightSide>
            {transactions.length !== 0 ? (
              <HistoryCharts transactions={transactions} />
            ) : (
              <Hint title='история пуста' subtitle="Разделите свой счет с друзьями и возвращайтесь :)" />
            )}
          </RightSide>
        </>
      );
}

export default HistoryPage