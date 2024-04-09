import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { Friend, Transaction } from '../types';

interface BillState {
  selectedFriends: Friend[];
  transactions: Transaction[];
}

const initialState: BillState = {
  selectedFriends: [],
  transactions: [],
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
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      localStorage.setItem('bills', JSON.stringify(state.transactions));
    },
  },
});

export const { addSelectedFriend, removeSelectedFriend, clearSelectedFriends, addTransaction } = billSlice.actions;

export const selectSelectedFriends = (state: RootState) => state.bill.selectedFriends;

export const selectTransactions = (state: RootState) => state.bill.transactions;

export default billSlice.reducer;