import React, { useState, useEffect } from 'react';
import { TextField, Switch, FormControlLabel, Select, MenuItem, InputLabel, FormControl, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedFriends, removeSelectedFriend } from '../../store/slices/billSlice';
import styles from './BillForm.module.scss';
import { SelectChangeEvent } from '@mui/material/Select';
import Button from '../UI/Button/Button';

const BillForm = () => {
  const selectedFriends = useSelector(selectSelectedFriends);
  const dispatch = useDispatch();
  const [splitEqually, setSplitEqually] = useState(false);
  const [totalAmount, setTotalAmount] = useState('');
  const [expenses, setExpenses] = useState<{ [key: number]: string }>({});
  const [myExpense, setMyExpense] = useState('0');
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);

  const handleDeselectFriend = (id: number) => {
    dispatch(removeSelectedFriend(id));
  };

  const handleExpenseChange = (friendId: number, value: string) => {
    setExpenses((prevState) => ({
      ...prevState,
      [friendId]: value,
    }));
  };

  const handleTotalAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalAmount(event.target.value);
  };

  const handlePayerChange = (event: SelectChangeEvent<string>) => {
    setSelectedFriendId(event.target.value !== '0' ? parseInt(event.target.value) : null);
  };

  useEffect(() => {
    if (!selectedFriends.length) {
      setMyExpense(totalAmount || '0');
    }
  }, [totalAmount, selectedFriends]);

  useEffect(() => {
    if (splitEqually) {
      const equalAmount = selectedFriends.length > 0 ? (+totalAmount / (selectedFriends.length + 1)).toFixed(2) : '';
      const newExpenses = selectedFriends.reduce((acc, friend) => {
        acc[friend.id] = equalAmount;
        return acc;
      }, {} as { [key: number]: string });
      setExpenses(newExpenses);
      setMyExpense(equalAmount);
    }
  }, [splitEqually, selectedFriends, totalAmount]);

  useEffect(() => {
    if (!splitEqually) {
      setExpenses({});
      setMyExpense('');
    }
  }, [splitEqually]);


  return (
    <div className={styles.main}>
      <h2 className={styles.title}>Разделить счет с друзьями</h2>
      <form className={styles.form}>
        {selectedFriends.length > 0 && totalAmount !== '' && (
          <FormControlLabel
            control={<Switch checked={splitEqually} onChange={() => setSplitEqually(!splitEqually)} />}
            label="Разделить пополам"
          />
        )}
        <div className={styles.friends}>
            {selectedFriends.length > 0 ? (
            selectedFriends.map((friend) => (
                <div key={friend.id} className={styles.friend}>
                    {friend.name}
                    <IconButton
                    onClick={() => handleDeselectFriend(friend.id)}
                    sx={{
                        color: '#fff',
                        transition: '.3s',
                    }}
                    >
                        <ClearIcon />
                    </IconButton>
                </div>
            ))
            ) : (
            null
            )}
            <div className={styles.friend_empty}></div>
        </div>
        <TextField
          id="total-amount"
          label="Общая сумма"
          value={totalAmount}
          onChange={handleTotalAmountChange}
          type='number'
        />
        {selectedFriends.length > 0 ? (
          selectedFriends.map((friend) => (
            <TextField
              key={`expense-${friend.id}`}
              label={`${friend.name} потратил`}
              value={expenses[friend.id] || ''}
              onChange={(e) => handleExpenseChange(friend.id, e.target.value)}
              type='number'
              disabled={splitEqually}
            />
          ))
        ) : (
          null
        )}
        <TextField
          id="my-expense"
          label="Я потратил"
          value={myExpense}
          onChange={(e) => setMyExpense(e.target.value)}
          type='number'
          disabled={splitEqually}
        />
        <FormControl variant="outlined">
          <InputLabel id="payer-label">Кто заплатит за счет?</InputLabel>
          <Select
            labelId="payer-label"
            id="payer-select"
            value={selectedFriendId !== null ? selectedFriendId.toString() : '0'}
            onChange={handlePayerChange}
            label="Кто заплатит за счет?"
            disabled={splitEqually}
          >
            <MenuItem value="0">Я</MenuItem>
            {selectedFriends.map((friend) => (
              <MenuItem key={`friend-${friend.id}`} value={friend.id.toString()}>{friend.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={styles.btn}>
          <Button buttontext="Добавить" />
        </div>
      </form>
    </div>
  );
};

export default BillForm;
