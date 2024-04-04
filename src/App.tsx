import React from 'react';
import LeftSide from './components/LeftSide/LeftSide';
import RightSide from './components/RightSide/RightSide';
import styles from './App.module.scss'
import Friends from './components/Friends/Friends';

function App() {
  return (
    <div className={styles.main}>
      <LeftSide>
        <Friends />
      </LeftSide>
      <RightSide>
        123vh
      </RightSide>
    </div>
  );
}

export default App;
