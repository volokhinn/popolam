import styles from '../../App.module.scss'
import Header from '../Header/Header';

const RightSide = ({children}:any) => {
  return (
    <>
      <div className={styles.right}>
        <Header />
        {children}
      </div>
    </>
  )
}

export default RightSide