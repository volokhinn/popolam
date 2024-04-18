import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store/store';
import styles from './App.module.scss';
import AddFriend from './pages/AddFriend/AddFriend';
import HomePage from './pages/HomePage/HomePage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@clerk/clerk-react';

const { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY }:any = process.env;

const supabaseUrl = REACT_APP_SUPABASE_URL;
const supabaseKey = REACT_APP_SUPABASE_KEY;

const supabaseClient = async (supabaseAccessToken: string) => {
  const supabase = createClient(
    supabaseUrl,
    supabaseKey,
    {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } }
    }
  );
  // set Supabase JWT on the client object,
  // so it is sent up with all Supabase requests
  return supabase;
};

function App() {
  return (
    <Provider store={store}>
      <div className={styles.main}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-friend" element={<AddFriend />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
