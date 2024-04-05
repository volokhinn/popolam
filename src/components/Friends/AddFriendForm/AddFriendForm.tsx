import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFriend } from '../../../store/slices/friendsSlice';
import { TextField } from '@mui/material';
import Button from '../../UI/Button/Button';
import styles from './AddFriendForm.module.scss';
import Snack from '../../UI/Snack/Snack';

const AddFriendForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleAddFriend = () => {
    dispatch(addFriend({ id: Date.now(), name, img, money: 0 }));
    setName('');
    setImg('');
    setOpenSnackBar(true)
  };

  return (
    <div className={styles.main}>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Имя друга"
        sx={{ width: '100%' }}
      />
      <TextField
        value={img}
        onChange={(e) => setImg(e.target.value)}
        label="Ссылка на фото (необязательно)"
        sx={{ width: '100%' }}
      />
      <Button buttontext="Добавить" onClick={handleAddFriend} />
      <Snack title="Друг успешно добавлен" openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} />
    </div>
  );
};

export default AddFriendForm;
