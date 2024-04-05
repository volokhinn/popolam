import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Импортируем useDispatch
import styles from './FriendItem.module.scss';
import { IconButton } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { removeFriend } from '../../../store/slices/friendsSlice'; // Импортируем removeFriend из слайса

type FriendItemProps = {
  id: number;
  name: string;
  money: number;
  img?: string;
};

const FriendItem = ({ id, name, money, img }: FriendItemProps) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch(); // Получаем функцию dispatch

  const renderUserImage = () => {
    if (img) {
      return <img src={img} alt="img" className={styles.img} />;
    } else {
      const initials = name.split(' ').map((word) => word.charAt(0)).join('');
      return <div className={styles.initials}>{initials}</div>;
    }
  };

  const handleRemoveFriend = () => {
    dispatch(removeFriend(id)); // Вызываем removeFriend через dispatch
  };

  return (
    <div
      className={styles.main}
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
          <IconButton
            onClick={handleRemoveFriend} // Используем функцию handleRemoveFriend для удаления друга
            sx={{
              backgroundColor: '#fff',
              color: 'rgba(229, 47, 91, 1)',
              transition: '.3s',
              '&:hover': { color: '#fff', backgroundColor: 'rgba(229, 47, 91, 1)' },
            }}
          >
            <ClearIcon />
          </IconButton>
        )}
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
    </div>
  );
};

export default FriendItem;
