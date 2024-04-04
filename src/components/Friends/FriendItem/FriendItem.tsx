import React from 'react'
import styles from './FriendItem.module.scss'
import { IconButton } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

type FriendItemProps = {
    name: string,
    money: number,
    img?: string
}

const FriendItem = ({name, money, img}:FriendItemProps) => {
  return (
    <div className={styles.main}>
        <div className={styles.main_info}>
            <img src={img} alt="img" className={styles.img} />
                <div className={styles.main_center}>
                    <div className={styles.name}>{name}</div>
                    {money !== 0 ? (<div className={`${styles.money} ${money > 0 ? styles.money_plus : styles.money_minus}`}>{money} рублей</div>) : null}
                </div>
        </div>
        <IconButton>
            <AddOutlinedIcon />
        </IconButton>
    </div>
  )
}

export default FriendItem