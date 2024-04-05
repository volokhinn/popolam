import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFriend } from '../../../store/slices/friendsSlice';
import { TextField } from '@mui/material';
import Button from '../../UI/Button/Button';
import styles from './AddFriendForm.module.scss';

const AddFriendForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [img, setImg] = useState('');

  const handleAddFriend = () => {
    dispatch(addFriend({ id: Date.now(), name, img, money: 0 }));
    setName('');
    setImg('');
  };

  return (
    <div className={styles.main}>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="outlined-multiline-flexible"
        label="Имя друга"
        sx={{ width: '100%' }}
      />
      <TextField
        value={img}
        onChange={(e) => setImg(e.target.value)}
        id="outlined-multiline-flexible"
        label="Ссылка на фото (необязательно)"
        sx={{ width: '100%' }}
      />
      <Button buttontext="Добавить" onClick={handleAddFriend} />
    </div>
  );
};

export default AddFriendForm;
