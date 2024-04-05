import LeftSide from "../../components/LeftSide/LeftSide"
import RightSide from "../../components/RightSide/RightSide"
import Friends from "../../components/Friends/Friends"
import FriendsHeader from "../../components/Friends/FriendsHeader/FriendsHeader"
import Hint from "../../components/Hint/Hint"
import BillForm from "../../components/BillForm/BillForm"

const HomePage = () => {
  return (
    <>
        <LeftSide>
            <FriendsHeader />
            <Friends />
        </LeftSide>
        <RightSide>
          <BillForm />
            {/* <Hint title='у вас пока что нет друзей :(' buttontext='Добавить' buttonlink='/add-friend' /> */}
            {/* <Hint title='Разделить счет' subtitle="выберите друга из списка слева, с кем вы хотите разделить счет" /> */}
        </RightSide>
    </>
  )
}

export default HomePage