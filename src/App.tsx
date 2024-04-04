import styles from './App.module.scss'
import AddFriend from './pages/AddFriend/AddFriend';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className={styles.main}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-friend" element={<AddFriend />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
