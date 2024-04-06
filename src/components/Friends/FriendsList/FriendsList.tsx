import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './FriendsList.module.scss';
import FriendItem from '../FriendItem/FriendItem';
import { RootState } from '../../../store/types';
import { fetchFriends, removeFriend } from '../../../store/slices/friendsSlice';
import Snack from '../../UI/Snack/Snack';
import { selectSelectedFriends, addSelectedFriend } from '../../../store/slices/billSlice';

const FriendsList = () => {
  const friends = useSelector((state: RootState) => state.friends.friends);
  const selectedFriends = useSelector(selectSelectedFriends);
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  const handleRemoveFriend = (id: number) => {
    dispatch(removeFriend(id));
    setOpenSnackBar(true);
  };

  const handleAddFriendToBill = (id: number) => {
    const selectedFriend = friends.find(friend => friend.id === id);
    if (selectedFriend) {
      dispatch(addSelectedFriend(selectedFriend));
    }
  };

  return (
    <div className={styles.main}>
      {Array.isArray(friends) && friends.length > 0 ? (
        friends.map((friend) => (
          <FriendItem
            key={friend.id}
            id={friend.id}
            name={friend.name}
            img={friend.img}
            money={friend.money}
            onRemoveFriend={handleRemoveFriend}
            isSelected={selectedFriends.some(selectedFriend => selectedFriend.id === friend.id)} 
            onAddFriendToBill={handleAddFriendToBill}
          />
        ))
      ) : (
        null
      )}
      <Snack title="Друг удален" openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} />
    </div>
  );
};

export default FriendsList;
