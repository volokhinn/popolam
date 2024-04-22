import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './FriendsList.module.scss';
import FriendItem from '../FriendItem/FriendItem';
import Snack from '../../UI/Snack/Snack';
import { selectSelectedFriends, addSelectedFriend } from '../../../store/slices/billSlice';
import { Skeleton, Stack } from '@mui/material';
import { useAppContext } from '../../../AppContext';

const FriendsList = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const dispatch = useDispatch();
  const selectedFriends = useSelector(selectSelectedFriends);

  const { friends, handleRemoveFriend, fetchFriendsFromSupabase, supabase } = useAppContext();
  useEffect(() => {
    if (supabase) {
      fetchFriendsFromSupabase();
      setTimeout(() => {
        setShowSkeleton(false);
      }, 600);
    }
  }, [fetchFriendsFromSupabase, supabase]);

  const memoizedFriends = useMemo(() => friends, [friends]);

  const handleAddFriendToBill = (id: number) => {
    const selectedFriend = memoizedFriends.find(friend => friend.id === id);
    if (selectedFriend) {
      dispatch(addSelectedFriend(selectedFriend));
    }
  };

  return (
    <div className={styles.main}>
      {showSkeleton && (
        <Stack spacing={2}>
          <Skeleton variant="rounded" width="100%" height={100} sx={{borderRadius: '20px'}} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{borderRadius: '20px'}} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{borderRadius: '20px'}} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{borderRadius: '20px'}} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{borderRadius: '20px'}} />
        </Stack>
      )}
      {!showSkeleton && memoizedFriends.length > 0 ? (
        memoizedFriends.map((friend) => (
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
