import { useEffect, useState } from 'react';
import LeftSide from "../../components/LeftSide/LeftSide";
import RightSide from "../../components/RightSide/RightSide";
import FriendsHeader from "../../components/Friends/FriendsHeader/FriendsHeader";
import Hint from "../../components/Hint/Hint";
import BillForm from "../../components/BillForm/BillForm";
import FriendsList from "../../components/Friends/FriendsList/FriendsList";
import { selectSelectedFriends } from "../../store/slices/billSlice";
import {supabaseClient} from '../../supabase';
import { useSelector } from 'react-redux';
import { useAuth } from '@clerk/clerk-react';

const HomePage = () => {
  const [friends, setFriends] = useState<any[]>([]);

  const selectedFriends = useSelector(selectSelectedFriends);

  const { getToken } = useAuth()

  useEffect(() => {
    async function fetchFriendsFromSupabase() {
      try {
        const supabaseAccessToken = await getToken({ template: 'supabase' });

        const supabase = await supabaseClient(supabaseAccessToken);

        const { data, error } = await supabase.from('friends').select('*');
        if (error) {
          throw error;
        }
        setFriends(data || []);
      } catch (error) {
        console.error('Error fetching friends', error);
      }
    }
    
    fetchFriendsFromSupabase();
  }, []);

  return (
    <>
      <LeftSide>
        <FriendsHeader />
        <FriendsList friendsList={friends} />
      </LeftSide>
      <RightSide>
        {selectedFriends.length > 0 ? (
          <BillForm />
        ) : (
          <Hint title='Разделить счет' subtitle="Выберите друга из списка слева, с кем вы хотите разделить счет" />
        )}
      </RightSide>
    </>
  );
};

export default HomePage;
