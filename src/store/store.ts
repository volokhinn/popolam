import { configureStore } from '@reduxjs/toolkit';
import friendsReducer from './slices/friendsSlice';

export default configureStore({
  reducer: {
    friends: friendsReducer
  }
});
