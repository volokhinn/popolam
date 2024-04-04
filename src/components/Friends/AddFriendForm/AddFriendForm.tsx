import React from 'react'
import { TextField } from '@mui/material'
import Button from '../../UI/Button/Button'
import styles from './AddFriendForm.module.scss'

const AddFriendForm = () => {
  return (
    <div className={styles.main}>
        <TextField id="outlined-multiline-flexible" label="Имя друга" sx={{width: '100%'}} />
        <TextField id="outlined-multiline-flexible" label="Ссылка на фото (необязательно)" sx={{width: '100%'}} />
        <Button buttontext="Добавить" />
    </div>
  )
}

export default AddFriendForm