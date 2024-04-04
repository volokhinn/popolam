import LeftSide from "../../components/LeftSide/LeftSide"
import RightSide from "../../components/RightSide/RightSide"
import Friends from "../../components/Friends/Friends"
import FriendsHeader from "../../components/Friends/FriendsHeader/FriendsHeader"
import Hint from "../../components/Hint/Hint"

const HomePage = () => {
  return (
    <>
        <LeftSide>
            <FriendsHeader />
            <Friends />
        </LeftSide>
        <RightSide>
            <Hint title='у вас пока что нет друзей :(' buttontext='Добавить' buttonlink='/add-friend' />
        </RightSide>
    </>
  )
}

export default HomePage