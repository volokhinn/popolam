import { useState } from 'react';
import { TextField, Alert } from '@mui/material';
import Button from '../../UI/Button/Button';
import styles from './AddFriendForm.module.scss';
import Snack from '../../UI/Snack/Snack';

import { supabaseClient } from '../../../supabase';
import { useAuth } from '@clerk/clerk-react';

const AddFriendForm = () => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [showError, setShowError] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { getToken } = useAuth();

  const handleAddFriend = async () => {
    if (name.length < 2 || name.length > 10) {
      setShowError(true);
      return;
    }
  
    try {
      const supabaseAccessToken = await getToken({ template: 'supabase' });

      const supabase = await supabaseClient(supabaseAccessToken);
      console.log(supabaseAccessToken);
      setShowError(false);
      const { error } = await supabase.from('friends').insert([
        { name: name[0].toUpperCase() + name.slice(1), img, money: 0 }
      ]);
      
      if (error) {
        console.error('Error adding friend:', error.message);
        return;
      }
      
      setName('');
      setImg('');
      setOpenSnackBar(true);
    } catch (error) {
      console.error('Error adding friend:');
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
