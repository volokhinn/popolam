import { useState } from 'react';
import { TextField, Alert } from '@mui/material';
import { Button as ButtonMUI } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styles from './AddFriendForm.module.scss';
import Snack from '../../UI/Snack/Snack';
import Button from '../../UI/Button/Button';

import { useAppContext } from '../../../AppContext';

const AddFriendForm = () => {
  const [name, setName] = useState('');
  const [file, setfile] = useState<File | null>(null);
  const [showError, setShowError] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { handleAddFriend } = useAppContext();

  const handleAddForm = () => {
    if (name.length < 2 || name.length > 10) {
      setShowError(true);
      return;
    }

    if (!file) {
      handleAddFriend(name, null);
    } else {
      handleAddFriend(name, file);
    }

    setName('');
    setfile(null);
    setOpenSnackBar(true);
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setfile(e.target.files[0]);
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
      {showError && <Alert severity="error">Длина имени должна быть от 2 до 10 символов</Alert>}
      <ButtonMUI
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {file ? file.name : 'Добавить фото'}
        <input
          type="file"
          name="image"
          accept="image/jpeg, image/png, image/jpg"
          hidden
          onChange={handleFileSelected}
        />
      </ButtonMUI>
      <div className={styles.btn}>
        <Button buttontext="Добавить" onClick={handleAddForm} />
      </div>
      <Snack title="Друг успешно добавлен" openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} />
    </div>
  );
};

export default AddFriendForm;