import LeftSide from "../../components/LeftSide/LeftSide";
import RightSide from "../../components/RightSide/RightSide";
import FriendsHeader from "../../components/Friends/FriendsHeader/FriendsHeader";
import Hint from "../../components/Hint/Hint";
import BillForm from "../../components/BillForm/BillForm";
import FriendsList from "../../components/Friends/FriendsList/FriendsList";
import { selectSelectedFriends } from "../../store/slices/billSlice";
import { useSelector } from 'react-redux';

const HomePage = () => {

  const selectedFriends = useSelector(selectSelectedFriends);

  return (
    <>
      <LeftSide>
        <FriendsHeader />
        <FriendsList />
      </LeftSide>
      <RightSide>
        {selectedFriends.length > 0 ? (
          <BillForm />
        ) : (
          <Hint title='Разделить счет' subtitle="Выберите друга из списка слева, с кем вы хотите разделить счет" />
        )}
      </RightSide>
    </>
  );
};

export default HomePage;
