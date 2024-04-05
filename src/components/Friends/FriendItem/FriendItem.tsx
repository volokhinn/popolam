import React from 'react';
import styles from './FriendItem.module.scss';
import { IconButton } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

type FriendItemProps = {
  name: string;
  money: number;
  img?: string;
};

const FriendItem = ({ name, money, img }: FriendItemProps) => {
  const renderUserImage = () => {
    if (img) {
      return <img src={img} alt="img" className={styles.img} />;
    } else {
      const initials = name.split(' ').map((word) => word.charAt(0)).join('');
      return <div className={styles.initials}>{initials}</div>;
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.main_info}>
        {renderUserImage()}
        <div className={styles.main_center}>
          <div className={styles.name}>{name}</div>
          {money !== 0 ? (
            <div className={`${styles.money} ${money > 0 ? styles.money_plus : styles.money_minus}`}>
              {money} рублей
            </div>
          ) : null}
        </div>
      </div>
      <IconButton
        sx={{
          backgroundColor: '#fff',
          color: 'rgba(229, 47, 91, 1)',
          transition: '.3s',
          '&:hover': { color: '#fff', backgroundColor: 'rgba(229, 47, 91, 1)' },
        }}
      >
        <AddOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default FriendItem;
