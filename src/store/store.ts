import { configureStore } from '@reduxjs/toolkit';
import friendsReducer from './slices/friendsSlice';
import billReducer from './slices/billSlice';

export const store = configureStore({
  reducer: {
    friends: friendsReducer,
    bill: billReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
