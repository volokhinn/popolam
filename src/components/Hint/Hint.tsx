import styles from './Hint.module.scss'
import Button from '../UI/Button/Button'

type HintProps = {
    title?: string,
    subtitle?: string,
    buttontext?: string,
    buttonlink?: string | undefined,
}

const Hint = ({title, subtitle, buttontext, buttonlink}:HintProps) => {
  return (
    <div className={styles.main}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.subtitle}>{subtitle}</div>
        {buttontext && buttonlink ? (<Button buttonlink={buttonlink} buttontext={buttontext} />) : null}
    </div>
  )
}

export default Hint