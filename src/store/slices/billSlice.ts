import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { Friend } from '../types';

interface BillState {
  selectedFriends: Friend[];
}

const initialState: BillState = {
  selectedFriends: [],
};

export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    addSelectedFriend: (state, action: PayloadAction<Friend>) => {
      state.selectedFriends.push(action.payload);
    },
    removeSelectedFriend: (state, action: PayloadAction<number>) => {
      state.selectedFriends = state.selectedFriends.filter((friend) => friend.id !== action.payload);
    },
    clearSelectedFriends: (state) => {
      state.selectedFriends = [];
    },
  },
});

export const { addSelectedFriend, removeSelectedFriend, clearSelectedFriends } = billSlice.actions;

export const selectSelectedFriends = (state: RootState) => state.bill.selectedFriends;

export default billSlice.reducer;
