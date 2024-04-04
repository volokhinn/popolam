import styles from './Hint.module.scss'

type HintProps = {
    title?: string,
    subtitle?: string,
    buttontext?: string,
    buttonlink?: string
}

const Hint = ({title, subtitle, buttontext, buttonlink}:HintProps) => {
  return (
    <div className={styles.main}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.subtitle}>{subtitle}</div>
        {buttontext && buttonlink ? (<a href={buttonlink} className={styles.btn}>{buttontext}</a>) : null}
    </div>
  )
}

export default Hint