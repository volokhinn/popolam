import styles from '../../App.module.scss'
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";

const RightSide = ({children}:any) => {

  const user = useUser();
  
  return (
    <>
      <div className={styles.right}>
      <div className={styles.header}>
        <div className={styles.username}>
          {user.user?.username}
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
        {children}
      </div>
    </>
  )
}

export default RightSide