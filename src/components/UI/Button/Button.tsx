import React, { useMemo } from 'react'
import styles from './Button.module.scss'
import { Link } from 'react-router-dom'

type ButtonProps = {
    buttonlink?: string,
    buttontext?: string,
    onClick?: () => void,
}

const Button = ({buttonlink, buttontext, onClick}: ButtonProps) => {
    const buttonElement = useMemo(() => {
        const commonProps = {
            className: styles.btn,
            onClick: onClick,
        };
        if (buttonlink) {
            return <Link to={buttonlink} {...commonProps}>{buttontext}</Link>;
        } else {
            return <button {...commonProps}>{buttontext}</button>;
        }
    }, [buttonlink, buttontext, onClick]);

    return buttonElement;
}

export default Button;