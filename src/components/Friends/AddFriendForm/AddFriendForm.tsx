import { useState } from 'react';
import { TextField, Alert } from '@mui/material';
import {Button as ButtonMUI} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styles from './AddFriendForm.module.scss';
import Snack from '../../UI/Snack/Snack';
import Button from '../../UI/Button/Button';

import { supabaseClient } from '../../../supabase';
import { useAuth } from '@clerk/clerk-react';

const AddFriendForm = () => {
  const [name, setName] = useState('');
  const [file, setfile] = useState<File | null>(null);
  
  const [showError, setShowError] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const BUCKET_URL="https://nigothnmpjcxraitwgte.supabase.co/storage/v1/object/public"
  
  const { getToken } = useAuth();

  const handleAddFriend = async () => {
    if (name.length < 2 || name.length > 10) {
      setShowError(true);
      return;
    }
  
    try {
      const supabaseAccessToken = await getToken({ template: 'supabase' });
      const supabase = await supabaseClient(supabaseAccessToken);

      if (file) {
        const filename = `${Date.now()}_${file.name}`
      const { data } = await supabase.storage.from('avatars').upload(`/avatars/${filename}`, file, {
        upsert: true,
        contentType: 'image/*'
      });
      

      const filepath = data?.path;

      const { error } = await supabase.from('friends').insert([
        { name: name[0].toUpperCase() + name.slice(1), img: `${BUCKET_URL}/avatars/${filepath}`, money: 0 }
      ]);
  
      if (error) {
        console.error('Error adding friend:', error.message);
        return;
      }

      } else {
        const { error } = await supabase.from('friends').insert([
          { name: name[0].toUpperCase() + name.slice(1), img: '', money: 0 }
        ]);

        if (error) {
          console.error('Error adding friend:', error.message);
          return;
        }
      }

      setName('');
      setfile(null);
      setOpenSnackBar(true);
    } catch (error) {
      console.error('Error adding friend:', error);
    }
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
            name='image'
            accept="image/jpeg, image/png"
            hidden
            onChange={handleFileSelected}
          />
        </ButtonMUI>
      <div className={styles.btn}>
        <Button buttontext="Добавить" onClick={handleAddFriend} />
      </div>
      <Snack title="Друг успешно добавлен" openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} />
    </div>
  );
};

export default AddFriendForm;