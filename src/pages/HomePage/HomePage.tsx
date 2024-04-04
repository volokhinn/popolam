import LeftSide from "../../components/LeftSide/LeftSide"
import RightSide from "../../components/RightSide/RightSide"
import Friends from "../../components/Friends/Friends"
import Hint from "../../components/Hint/Hint"

const HomePage = () => {
  return (
    <>
        <LeftSide>
            <Friends />
        </LeftSide>
        <RightSide>
            <Hint title='у вас пока что нет друзей :(' buttontext='Добавить' buttonlink='/friends' />
        </RightSide>
    </>
  )
}

export default HomePage