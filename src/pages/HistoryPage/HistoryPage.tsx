import LeftSide from '../../components/LeftSide/LeftSide';
import RightSide from '../../components/RightSide/RightSide';
import HistoryList from '../../components/History/HistoryList/HistoryList';
import HistoryCharts from '../../components/History/HistoryCharts/HistoryCharts';
import FriendsHeader from '../../components/Friends/FriendsHeader/FriendsHeader';

const HistoryPage = () => {
    return (
        <>
          <LeftSide>
            <FriendsHeader />
            <HistoryList />
          </LeftSide>
          <RightSide>
            <HistoryCharts />
          </RightSide>
        </>
      );
}

export default HistoryPage