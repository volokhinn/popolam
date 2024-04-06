import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store/store';
import styles from './App.module.scss';
import AddFriend from './pages/AddFriend/AddFriend';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <Provider store={store}>
      <div className={styles.main}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-friend" element={<AddFriend />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
