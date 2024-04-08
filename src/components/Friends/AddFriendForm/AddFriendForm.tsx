import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFriend } from '../../../store/slices/friendsSlice';
import { TextField, Alert } from '@mui/material';
import Button from '../../UI/Button/Button';
import styles from './AddFriendForm.module.scss';
import Snack from '../../UI/Snack/Snack';

const AddFriendForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [showError, setShowError] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleAddFriend = () => {
    if (name.length > 1) {
      dispatch(addFriend({ id: Date.now(), name, img, money: 0 }));
      setName('');
      setImg('');
      setOpenSnackBar(true);
      setShowError(false);
    }
    else {
      setShowError(true);
    }
  };

  return (
    <div className={styles.main}>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Имя друга"
        sx={{ width: '100%' }}
      />
      {showError && <Alert severity="error">Длина имени должна быть больше 2 символов</Alert>}
      <TextField
        value={img}
        onChange={(e) => setImg(e.target.value)}
        label="Ссылка на фото (необязательно)"
        sx={{ width: '100%' }}
      />
      <div className={styles.btn}>
        <Button buttontext="Добавить" onClick={handleAddFriend} />
      </div>
      <Snack title="Друг успешно добавлен" openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} />
    </div>
  );
};

export default AddFriendForm;
