import { useEffect, useState } from 'react'
import supabase from '../../supabase'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";

import styles from './Header.module.scss'

import {SpeedDialIcon} from '@mui/material';

const Header = () => {
    const user = useUser();

    const actions = [
        {icon: <SpeedDialAction color='primary' />, name: 'Очистить историю', action: () => clearHistory()},
    ]

    const clearHistory = async () => {
        try {
            const { error } = await supabase.from('transactions').delete().eq('id', '1')
            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('Error clearing transactions:', error);
        }
    }
    
  return (
    <div className={styles.header}>
        <div className={styles.header_content}>
            <div className={styles.username}>
                {user.user?.username}
            </div>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SpeedDial ariaLabel='SpeedDial' icon={<SpeedDialIcon />} direction='down' sx={{overflow: 'hidden'}}>
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
  )
}

export default Header