import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './FriendsList.module.scss';
import FriendItem from '../FriendItem/FriendItem';
import { RootState } from '../../../store/types';
import { fetchFriends, removeFriend } from '../../../store/slices/friendsSlice';
import Snack from '../../UI/Snack/Snack';

const FriendsList = () => {
  const friends = useSelector((state: RootState) => state.friends.friends);
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  const handleRemoveFriend = (id: number) => {
    dispatch(removeFriend(id));
    setOpenSnackBar(true);
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
