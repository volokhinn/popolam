import styles from './HistoryItem.module.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import { TransactionDetails } from '../../../store/types';

interface HistoryItemProps {
  date: string;
  totalAmount: number;
  friendNames: string[];
  details: TransactionDetails[];
  myAmount: string;
  paidBy: number | null,
}

const HistoryItem = ({ date, totalAmount, friendNames, details, myAmount, paidBy }: HistoryItemProps) => {
  const [openDetails, setOpenDetails] = useState(false);

  const renderFriendNames = (friendNames: string[]) => {
    const MAX_DISPLAY = 4;
    const remainingCount = friendNames.length - MAX_DISPLAY;
    const displayedNames = friendNames.slice(0, MAX_DISPLAY);
    return (
      <>
        {displayedNames.join(', ')}
        {remainingCount > 0 && `...`}
      </>
    );
  };

  const renderFriendImages = (details: TransactionDetails[]) => {
    const MAX_DISPLAY = 4;
    const remainingCount = details.length - MAX_DISPLAY;
    const displayedDetails = details.slice(0, MAX_DISPLAY);
    return (
      <>
        {displayedDetails.map((detail, index) => (
          <div key={index} className={styles.imgs_wrapper}>
            {detail.friendImg ? (
              <img className={styles.img} src={detail.friendImg} alt={detail.friendName} />
            ) : (
              <div className={styles.initials}>{detail.friendName.split(' ').map((name: string) => name.charAt(0)).join('')}</div>
            )}
          </div>
        ))}
        {remainingCount > 0 && ` + ${remainingCount}`}
      </>
    );
  };

  return (
    <div className={styles.item}>
      <div className={styles.main}>
        <div className={styles.info}>
          <div className={styles.date}>{date}</div>
          <div className={styles.names}>{renderFriendNames(friendNames)}</div>
          <div className={styles.imgs}>
            {renderFriendImages(details)}
          </div>
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
              {detail.friendName}: {detail.amount} рублей
            </div>
          ))}
          <div>Я потратил: {+myAmount} рублей</div>
          <div>За счет заплатил: {paidBy === null ? 'Я' : paidBy}</div>
        </div>
      )}
    </div>
  );
};

export default HistoryItem;
