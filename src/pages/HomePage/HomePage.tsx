import LeftSide from "../../components/LeftSide/LeftSide"
import RightSide from "../../components/RightSide/RightSide"
import FriendsHeader from "../../components/Friends/FriendsHeader/FriendsHeader"
import Hint from "../../components/Hint/Hint"
import BillForm from "../../components/BillForm/BillForm"
import FriendsList from "../../components/Friends/FriendsList/FriendsList"
import { fetchFriends } from "../../store/slices/friendsSlice"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store/types"

const HomePage = () => {
  const friends = useSelector((state: RootState) => state.friends.friends);
  console.log(friends);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <>
        <LeftSide>
            <FriendsHeader />
            <FriendsList />
        </LeftSide>
        <RightSide>
          {/* <BillForm /> */}
          {friends.length === 0 ? <Hint title='у вас пока что нет друзей :(' buttontext='Добавить' buttonlink='/add-friend' /> : <Hint title='Разделить счет' subtitle="выберите друга из списка слева, с кем вы хотите разделить счет" />}
        </RightSide>
    </>
  )
}

export default HomePage