import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './FriendsList.module.scss';
import FriendItem from '../FriendItem/FriendItem';
import Snack from '../../UI/Snack/Snack';
import { selectSelectedFriends, addSelectedFriend } from '../../../store/slices/billSlice';
import {supabaseClient} from '../../../supabase';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Skeleton, Stack } from '@mui/material';

const FriendsList = ({friendsList}: any) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const dispatch = useDispatch();
  const selectedFriends = useSelector(selectSelectedFriends);
  const [friends, setFriends] = useState<any[]>([]);
  const { getToken } = useAuth();

  const user = useUser();
  const userId = user.user ? user.user.id : '';
  
  useEffect(() => {
    const fetchFriendsFromSupabase = async () => {

      try {
        const supabaseAccessToken = await getToken({ template: 'supabase' });

        const supabase = await supabaseClient(supabaseAccessToken);
        
        const { data, error } = await supabase.from('friends').select('*').eq('user_id', userId);
        if (error) {
          throw error;
        }
        setFriends(data || null);
      } catch (error) {
        console.error('Error fetching friends:');
      }
    }
    
    fetchFriendsFromSupabase();
  }, []);

  const handleRemoveFriend = async (id: number) => {
    try {
      const supabaseAccessToken = await getToken({ template: 'supabase' });

      const supabase = await supabaseClient(supabaseAccessToken);
      
      const { error } = await supabase.from('friends').delete().eq('id', id);
      if (error) {
        throw error;
      }

      setFriends(prevFriends => prevFriends.filter(friend => friend.id !== id));
      setOpenSnackBar(true);
    } catch (error) {
      console.error('Error removing friend:');
    }
  };

  const handleAddFriendToBill = (id: number) => {
    const selectedFriend = friends.find(friend => friend.id === id);
    if (selectedFriend) {
      dispatch(addSelectedFriend(selectedFriend));
    }
  };

  return (
    <div className={styles.main}>
      {/* {friends.length === 0 && (
        <Stack spacing={2}>
          <Skeleton variant="rounded" width="100%" height={100} sx={{borderRadius: '20px'}} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{borderRadius: '20px'}} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{borderRadius: '20px'}} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{borderRadius: '20px'}} />
          <Skeleton variant="rounded" width="100%" height={100} sx={{borderRadius: '20px'}} />
        </Stack>
      )} */}
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
