import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import styles from './FriendsHeader.module.scss'

const FriendsHeader = () => {
  const location = useLocation();
  const isNotMainPage = location.pathname !== "/";
  const isAddFriendPage = location.pathname === "/add-friend";
  
  return (
    <div className={styles.main}>
      {isNotMainPage && (
        <Link to="/" className={styles.backButton}>
          <IconButton color='primary'>
            <ArrowBackIosIcon />
          </IconButton>
        </Link>
      )}
      <Link to="/history" className={styles.link}>История</Link>
      {isAddFriendPage ? (
        <IconButton sx={{backgroundColor: 'rgba(229, 47, 91, 1)', color: '#fff', border: '1px solid rgba(229, 47, 91, 1)', pointerEvents: 'none' }}>
            <AddOutlinedIcon />
        </IconButton>
      ) : (
        <Link to="/add-friend">
          <IconButton sx={{backgroundColor: 'rgba(229, 47, 91, 1)', color: '#fff', border: '1px solid rgba(229, 47, 91, 1)', transition: '.3s', "&:hover": { color: "rgba(229, 47, 91, 1)", backgroundColor: '#fff' } }}>
              <AddOutlinedIcon />
          </IconButton>
        </Link>
      )}
    </div>
  )
}

export default FriendsHeader;
