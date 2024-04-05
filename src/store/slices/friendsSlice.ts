import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Friend {
  id: number;
  name: string;
  img?: string;
  money: number;
}

interface FriendsState {
  friends: Friend[];
}

const initialState: FriendsState = {
  friends: [],
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
    fetchFriends: (state) => {
      const friendsFromStorage = localStorage.getItem('friends');
      state.friends = friendsFromStorage ? JSON.parse(friendsFromStorage) : [];
    },
  }
});

export const { addFriend, removeFriend, fetchFriends } = friendsSlice.actions;
export default friendsSlice.reducer;
