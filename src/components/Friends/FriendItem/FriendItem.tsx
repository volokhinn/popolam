import React, { useState } from 'react';
import styles from './FriendItem.module.scss';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { Tooltip } from '@mui/material';

type FriendItemProps = {
  id: number;
  name: string;
  money: number;
  img?: string;
  isSelected: boolean;
  onRemoveFriend: (id: number, deleteTransactions: boolean) => void;
  onAddFriendToBill: (id: number) => void;
};

const FriendItem = ({ id, name, money, img, isSelected, onRemoveFriend, onAddFriendToBill }: FriendItemProps) => {
  const [hovered, setHovered] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteTransactions, setDeleteTransactions] = useState(false);

  const renderUserImage = () => {
    if (img) {
      return <img src={img} alt="avatar" className={styles.img} />;
    } else {
      const initials = name.split(' ').map((word) => word.charAt(0)).join('');
      return <div className={styles.initials}>{initials}</div>;
    }
  };

  const handleRemove = () => {
    onRemoveFriend(id, deleteTransactions);
    setOpenDialog(false);
  };

  return (
    <div
      className={`${styles.main} ${isSelected ? styles.selected : ''}`}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <div className={styles.main_info}>
        {renderUserImage()}
        <div className={styles.main_center}>
          <div className={styles.name}>{name}</div>
          {money !== 0 ? (
            <div className={`${styles.money} ${money > 0 ? styles.money_plus : styles.money_minus}`}>
              {money} рублей
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.buttons}>
        {hovered && !isSelected && (
          <Tooltip disableInteractive title="Удалить из списка друзей" enterDelay={600} enterNextDelay={1000}>
            <span>
              <IconButton
                onClick={() => setOpenDialog(true)}
                sx={{
                  backgroundColor: '#fff',
                  color: 'rgba(229, 47, 91, 1)',
                  transition: '.3s',
                  '&:hover': { color: '#fff', backgroundColor: 'rgba(229, 47, 91, 1)' },
                }}
              >
                <ClearIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}
        <Tooltip
          disableInteractive
          title={isSelected ? "Друг выбран для разделения счета" : "Разделить счет"}
          enterDelay={600}
          enterNextDelay={1000}
        >
          <span>
            <IconButton
              onClick={() => onAddFriendToBill(id)}
              disabled={isSelected}
              sx={{
                backgroundColor: '#fff',
                color: 'rgba(229, 47, 91, 1)',
                transition: '.3s',
                '&:hover': { color: '#fff', backgroundColor: 'rgba(229, 47, 91, 1)' },
              }}
            >
              <AddOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{`Удалить ${name} из списка друзей?`}</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={<Checkbox checked={deleteTransactions} onChange={(e) => setDeleteTransactions(e.target.checked)} />}
            label="Удалить историю транзакций с этим другом"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
          <Button onClick={handleRemove} color="error">Удалить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FriendItem;