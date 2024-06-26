import LeftSide from "../../components/LeftSide/LeftSide"
import RightSide from "../../components/RightSide/RightSide"
import AddFriendForm from "../../components/Friends/AddFriendForm/AddFriendForm"
import Hint from "../../components/Hint/Hint"
import FriendsHeader from "../../components/Friends/FriendsHeader/FriendsHeader"

const AddFriend = () => {
  return (
    <>
        <LeftSide>
            <FriendsHeader />
            <AddFriendForm />
        </LeftSide>
        <RightSide>
            <Hint title='добавить друга' subtitle='введите имя и нажмите на “сохранить”' />
        </RightSide>
    </>
  )
}

export default AddFriend