import styles from '../../App.module.scss'

const LeftSide = ({children}:any) => {
  return (
    <div className={styles.left}>{children}</div>
  )
}

export default LeftSide