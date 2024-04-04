import styles from './FriendsList.module.scss'
import FriendItem from '../FriendItem/FriendItem'
import { friends } from '../../../data'

const FriendsList = () => {
    const friendsList = friends.map((friend, index) => (
        <FriendItem key={index} name={friend.name} img={friend.img} money={friend.money} />
    ))
  return (
    <div className={styles.main}>{friendsList}</div>
  )
}

export default FriendsList