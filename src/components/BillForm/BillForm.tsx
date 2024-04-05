import React from 'react'
import styles from './BillForm.module.scss'
import { TextField, Switch, FormControlLabel, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl } from '@mui/material'
import Button from '../UI/Button/Button'

const BillForm = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

  return (
    <div className={styles.main}>
        <h2 className={styles.title}>Разделить счет с друзьями</h2>
        <form className={styles.form}>
        <FormControlLabel control={<Switch defaultChecked />} label="Разделить пополам" />
                <TextField id="outlined-multiline-flexible" label="Сумма" />
                <TextField id="outlined-multiline-flexible" label="Имя потратил" />
                <TextField id="outlined-multiline-flexible" label="Имя потратил" />
                <TextField id="outlined-multiline-flexible" label="Вы потратили" />

                <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-standard-label">Кто заплатит за счет?</InputLabel>
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                label="Кто заплатит за счет?"
                onChange={handleChange}
                sx={{ minWidth: 320 }}
                >
                    <MenuItem value={10}>Я</MenuItem>
                    <MenuItem value={20}>Имя</MenuItem>
                    <MenuItem value={30}>Имя</MenuItem>
                </Select>
                <div className={styles.btn}>
                    <Button buttontext="Добавить"/>
                </div>
                </FormControl>
        </form>
    </div>
  )
}

export default BillForm