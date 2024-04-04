import React from 'react'
import styles from '../../App.module.scss'

const RightSide = ({children}:any) => {
  return (
    <div className={styles.right}>{children}</div>
  )
}

export default RightSide