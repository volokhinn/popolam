import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeftSide from "../../components/LeftSide/LeftSide";
import RightSide from "../../components/RightSide/RightSide";
import FriendsHeader from "../../components/Friends/FriendsHeader/FriendsHeader";
import Hint from "../../components/Hint/Hint";
import BillForm from "../../components/BillForm/BillForm";
import FriendsList from "../../components/Friends/FriendsList/FriendsList";
import { fetchFriends } from "../../store/slices/friendsSlice";
import { selectSelectedFriends } from "../../store/slices/billSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const selectedFriends = useSelector(selectSelectedFriends);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedFriends.length > 0) {
      setSelectedFriendId(selectedFriends[0].id);
    } else {
      setSelectedFriendId(null);
    }
  }, [selectedFriends]);

  return (
    <>
      <LeftSide>
        <FriendsHeader />
        <FriendsList />
      </LeftSide>
      <RightSide>
        {selectedFriendId !== null ? (
          <BillForm />
        ) : (
          <Hint title='Разделить счет' subtitle="Выберите друга из списка слева, с кем вы хотите разделить счет" />
        )}
      </RightSide>
    </>
  );
};

export default HomePage;
