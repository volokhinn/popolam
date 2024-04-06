import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Friend {
  id: number;
  name: string;
  img?: string;
  money: number;
}

interface FriendsState {
  friends: Friend[];
  selectedFriendIds: number[];
}

const initialState: FriendsState = {
  friends: [],
  selectedFriendIds: [],
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addFriend: (state, action: PayloadAction<Friend>) => {
      state.friends.push(action.payload);
      localStorage.setItem('friends', JSON.stringify(state.friends));
    },
    removeFriend: (state, action: PayloadAction<number>) => {
      state.friends = state.friends.filter(friend => friend.id !== action.payload);
      localStorage.setItem('friends', JSON.stringify(state.friends));
    },
    toggleSelectedFriend: (state, action: PayloadAction<number>) => {
      const index = state.selectedFriendIds.indexOf(action.payload);
      if (index === -1) {
        state.selectedFriendIds.push(action.payload);
      } else {
        state.selectedFriendIds.splice(index, 1);
      }
    },
    fetchFriends: (state) => {
      const friendsFromStorage = localStorage.getItem('friends');
      state.friends = friendsFromStorage ? JSON.parse(friendsFromStorage) : [];
    },
  }
});

export const { addFriend, removeFriend, toggleSelectedFriend, fetchFriends } = friendsSlice.actions;

export const selectSelectedFriendIds = (state: RootState) => state.friends.selectedFriendIds;

export default friendsSlice.reducer;
