import React, { useState, useEffect } from 'react';
import { TextField, Switch, FormControlLabel, Select, MenuItem, InputLabel, FormControl, IconButton, Alert } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedFriends, removeSelectedFriend, clearSelectedFriends } from '../../store/slices/billSlice';
import styles from './BillForm.module.scss';
import { SelectChangeEvent } from '@mui/material/Select';
import Button from '../UI/Button/Button';
import { updateFriendMoney } from '../../store/slices/friendsSlice';
import Snack from '../UI/Snack/Snack';

const BillForm = () => {
  const selectedFriends = useSelector(selectSelectedFriends);
  const dispatch = useDispatch();
  
  const [splitEqually, setSplitEqually] = useState(false);
  const [totalAmount, setTotalAmount] = useState('');
  const [expenses, setExpenses] = useState<{ [key: number]: string }>({});
  const [myExpense, setMyExpense] = useState('0');
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [totalAmountError, setTotalAmountError] = useState<string>('');
  const [myExpenseError, setMyExpenseError] = useState<string>('');
  const [friendExpensesErrors, setFriendExpensesErrors] = useState<{ [key: number]: string }>({});

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

  const addToHistory = () => {
    const amount = parseFloat(myExpense);
    const paidByMe = selectedFriendId === null;
    const friendIds = selectedFriends.map(friend => friend.id);

    setTotalAmountError('');
    setMyExpenseError('');
    setFriendExpensesErrors({});

    if (!totalAmount.trim()) {
      setTotalAmountError('Введите общую сумму');
      return;
    }

    if (splitEqually && (parseFloat(totalAmount) % selectedFriends.length !== 0)) {
      setTotalAmountError('Общая сумма должна быть кратной количеству выбранных друзей');
      return;
    }

    selectedFriends.forEach((friend) => {
      const expense = expenses[friend.id];
      if (!expense || !expense.trim()) {
        setFriendExpensesErrors((prevState) => ({
          ...prevState,
          [friend.id]: `Введите расход для ${friend.name}`,
        }));
      }
    });

    if (selectedFriendId === null && !myExpense.trim()) {
      setMyExpenseError('Введите вашу сумму расходов');
      return;
    }

    dispatch(updateFriendMoney({ selectedFriendId, friendIds, amount, paidByMe }));
    setMyExpense('');
    setExpenses({});
    setTotalAmount('');
    setSplitEqually(false);
    setSelectedFriendId(null);
    setOpenSnackBar(true);
    setTimeout(() => dispatch(clearSelectedFriends()), 3000)
  };

  useEffect(() => {
    if (splitEqually) {
      const equalAmount = (+totalAmount / (selectedFriends.length + 1)).toFixed(2);
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
        {totalAmount && (
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
        {totalAmountError && <Alert severity="error">{totalAmountError}</Alert>}
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
          {Object.keys(friendExpensesErrors).map((key) => (
            <Alert severity="error" key={key}>{friendExpensesErrors[parseInt(key)]}</Alert>
          ))}
        <TextField
          id="my-expense"
          label="Я потратил"
          value={myExpense}
          onChange={(e) => setMyExpense(e.target.value)}
          type='number'
          disabled={splitEqually}
        />
        {myExpenseError && <Alert severity="error">{myExpenseError}</Alert>}
        <FormControl variant="outlined">
          <InputLabel id="payer-label">Кто заплатит за счет?</InputLabel>
          <Select
            labelId="payer-label"
            id="payer-select"
            value={selectedFriendId !== null ? selectedFriendId.toString() : '0'}
            onChange={handlePayerChange}
            label="Кто заплатит за счет?"
          >
            <MenuItem value="0">Я</MenuItem>
            {selectedFriends.map((friend) => (
              <MenuItem key={`friend-${friend.id}`} value={friend.id.toString()}>{friend.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={styles.btn}>
          <Button buttontext="Добавить" onClick={addToHistory} />
        </div>
      </form>
      <Snack title="Счет успешно разделен" openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} />
    </div>
  );
};

export default BillForm;
