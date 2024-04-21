import { useState } from 'react';
import { SpeedDial, SpeedDialAction, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button as ButtonMUI } from '@mui/material';
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { useAppContext } from '../../AppContext';

import LayersClearIcon from '@mui/icons-material/LayersClear';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';

import styles from './Header.module.scss';

import { SpeedDialIcon } from '@mui/material';

const Header = () => {
    const user = useUser();

    const { clearHistory, clearFriends } = useAppContext();

    const [openClearHistoryDialog, setOpenClearHistoryDialog] = useState(false);
    const [openClearFriendsDialog, setOpenClearFriendsDialog] = useState(false);

    const handleOpenClearHistoryDialog = () => {
        setOpenClearHistoryDialog(true);
    };

    const handleCloseClearHistoryDialog = () => {
        setOpenClearHistoryDialog(false);
    };

    const handleOpenClearFriendsDialog = () => {
        setOpenClearFriendsDialog(true);
    };

    const handleCloseClearFriendsDialog = () => {
        setOpenClearFriendsDialog(false);
    };

    const handleClearHistory = async () => {
        try {
            await clearHistory();
            handleCloseClearHistoryDialog();
        } catch (error) {
            console.error('Error clearing history:', error);
        }
    };

    const handleClearFriends = async () => {
        try {
            await clearFriends();
            handleCloseClearFriendsDialog();
        } catch (error) {
            console.error('Error clearing friends:', error);
        }
    };

    const actions = [
        { icon: <LayersClearIcon color='primary' />, name: 'Очистить историю', action: handleOpenClearHistoryDialog },
        { icon: <GroupRemoveIcon color='primary' />, name: 'Удалить всех друзей', action: handleOpenClearFriendsDialog },
    ];

    return (
        <div className={styles.header}>
            <div className={styles.header_content}>
                <div className={styles.username}>
                    {user.user?.username}
                </div>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <div style={{ position: 'relative' }}>
                    <SpeedDial ariaLabel='SpeedDial' icon={<SpeedDialIcon />} direction='down' sx={{ position: 'absolute', top: '-18px', '& .MuiFab-primary': { width: 35, height: 35 } }}>
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={action.action}
                            />
                        ))}
                    </SpeedDial>
                </div>
            </div>
            <Dialog
                open={openClearHistoryDialog}
                onClose={handleCloseClearHistoryDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Очистить историю?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите очистить историю? Это действие нельзя будет отменить.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ButtonMUI onClick={handleCloseClearHistoryDialog}>Отмена</ButtonMUI>
                    <ButtonMUI onClick={handleClearHistory} autoFocus>
                        Очистить
                    </ButtonMUI>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openClearFriendsDialog}
                onClose={handleCloseClearFriendsDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Удалить всех друзей?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите удалить всех друзей? Это действие нельзя будет отменить.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ButtonMUI onClick={handleCloseClearFriendsDialog}>Отмена</ButtonMUI>
                    <ButtonMUI onClick={handleClearFriends} autoFocus>
                        Удалить
                    </ButtonMUI>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Header;