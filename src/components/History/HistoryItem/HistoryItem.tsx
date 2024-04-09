import styles from './HistoryItem.module.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Transaction } from '../../../store/types';

const HistoryItem = ({ date, totalAmount, friendNames, details, myAmount }:Transaction) => {
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <div className={styles.item}>
        <div className={styles.main}>
        <div className={styles.info}>
            <div className={styles.date}>{date}</div>
            <div className={styles.names}>{friendNames.join(', ')}</div>
            <div className={styles.money}>{totalAmount} рублей</div>
        </div>
        <Tooltip disableInteractive title="Подробнее" enterDelay={600} enterNextDelay={1000}>
            <span>
            <IconButton
                onClick={() => setOpenDetails(!openDetails)}
                sx={{
                color: 'rgba(229, 47, 91, 1)',
                transition: '.3s',
                }}
            >
                <ExpandMoreIcon sx={{ transform: openDetails ? 'rotate(180deg)' : 'rotate(0)' }} />
            </IconButton>
            </span>
        </Tooltip>
        </div>
        {openDetails && (
            <div className={styles.details}>
                {details.map((detail, index) => (
                    <div key={index}>
                        {detail.friendName} потратил: {detail.amount} рублей
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default HistoryItem;
