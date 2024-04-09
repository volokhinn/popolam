import styles from './HistoryPage.module.scss'
import LeftSide from '../../components/LeftSide/LeftSide';
import RightSide from '../../components/RightSide/RightSide';
import Hint from '../../components/Hint/Hint';

const HistoryPage = () => {
    return (
        <>
          <LeftSide>
          </LeftSide>
          <RightSide>
              <Hint title='История' subtitle="Тут история" />
          </RightSide>
        </>
      );
}

export default HistoryPage