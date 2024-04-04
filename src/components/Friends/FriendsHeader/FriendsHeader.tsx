import React from 'react'
import styles from './FriendsHeader.module.scss'
import { IconButton } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const FriendsHeader = () => {
  return (
    <div className={styles.main}>
        <div className={styles.link}>Мои друзья</div>
        <a href="/history" className={styles.link}>История</a>
        <IconButton>
            <AddOutlinedIcon />
        </IconButton>
    </div>
  )
}

export default FriendsHeader