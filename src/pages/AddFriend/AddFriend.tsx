import LeftSide from "../../components/LeftSide/LeftSide"
import RightSide from "../../components/RightSide/RightSide"
import AddFriendForm from "../../components/Friends/AddFriendForm/AddFriendForm"
import Hint from "../../components/Hint/Hint"

const AddFriend = () => {
  return (
    <>
        <LeftSide>
            <AddFriendForm />
        </LeftSide>
        <RightSide>
            <Hint title='добавить друга' buttontext='введите имя и нажмите на “сохранить”' />
        </RightSide>
    </>
  )
}

export default AddFriend