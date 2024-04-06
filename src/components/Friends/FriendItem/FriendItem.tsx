import React, { useState } from 'react';
import styles from './FriendItem.module.scss';
import { IconButton } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { Tooltip } from '@mui/material';

type FriendItemProps = {
  id: number;
  name: string;
  money: number;
  img?: string;
  isSelected: boolean;
  onRemoveFriend: (id: number) => void;
  onAddFriendToBill: (id: number) => void;
};

const FriendItem = ({ id, name, money, img, isSelected, onRemoveFriend, onAddFriendToBill }: FriendItemProps) => {
  const [hovered, setHovered] = useState(false);

  const renderUserImage = () => {
    if (img) {
      return <img src={img} alt="img" className={styles.img} />;
    } else {
      const initials = name.split(' ').map((word) => word.charAt(0)).join('');
      return <div className={styles.initials}>{initials}</div>;
    }
  };

  return (
    <div
      className={`${styles.main} ${isSelected ? styles.selected : ''}`}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
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
      <div className={styles.buttons}>
        {hovered && (
          <Tooltip disableInteractive title="Удалить из списка друзей" enterDelay={600} enterNextDelay={1000}>
            <IconButton
              onClick={() => onRemoveFriend(id)}
              sx={{
                backgroundColor: '#fff',
                color: 'rgba(229, 47, 91, 1)',
                transition: '.3s',
                '&:hover': { color: '#fff', backgroundColor: 'rgba(229, 47, 91, 1)' },
              }}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip disableInteractive title="Разделить счет" enterDelay={600} enterNextDelay={1000}>
          <IconButton
            onClick={() => onAddFriendToBill(id)}
            sx={{
              backgroundColor: '#fff',
              color: 'rgba(229, 47, 91, 1)',
              transition: '.3s',
              '&:hover': { color: '#fff', backgroundColor: 'rgba(229, 47, 91, 1)' },
            }}
          >
            <AddOutlinedIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default FriendItem;
