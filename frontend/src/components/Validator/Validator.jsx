import React from 'react'
import styles from './styles/Validator.module.css'

function Validator(props) {
    const {className, text} = props

  return (
    <div className={`${className} ${styles.validator}`}>
        <p className={styles.validator__text}>{text}</p>
    </div>
  )
}

export default Validator
