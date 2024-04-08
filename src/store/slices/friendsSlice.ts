import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    updateFriendMoney: (state, action: PayloadAction<{ selectedFriendId: number | null, friendIds: number[]; amount: number; paidByMe: boolean }>) => {
      const { selectedFriendId, friendIds, amount, paidByMe } = action.payload;
      const sign = paidByMe ? 1 : -1;
    
      friendIds.forEach(friendId => {
        if (!paidByMe && friendId !== selectedFriendId) {
          return;
        }
        const friend = state.friends.find(friend => friend.id === friendId);
        if (friend) {
          friend.money += sign * amount;
        }
      });
    
      localStorage.setItem('friends', JSON.stringify(state.friends));
    }    
  }
});

export const { addFriend, removeFriend, toggleSelectedFriend, fetchFriends, updateFriendMoney } = friendsSlice.actions;

export default friendsSlice.reducer;
