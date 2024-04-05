import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './FriendsList.module.scss';
import FriendItem from '../FriendItem/FriendItem';
import { RootState } from '../../../store/types';
import { fetchFriends } from '../../../store/slices/friendsSlice';

const FriendsList = () => {
  const friends = useSelector((state: RootState) => state.friends.friends);
  console.log(friends);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <div className={styles.main}>
      {Array.isArray(friends) && friends.length > 0 ? (
        friends.map((friend) => (
          <FriendItem key={friend.id} id={friend.id} name={friend.name} img={friend.img} money={friend.money} />
        ))
      ) : (
        null
      )}
    </div>
  );
};

export default FriendsList;
