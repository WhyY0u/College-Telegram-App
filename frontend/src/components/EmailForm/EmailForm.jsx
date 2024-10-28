import React, { useState } from 'react'
import styles from './styles/EmailForm.module.css'

function EmailForm() {
    const [emailValue, setEmailValue] = useState('')
    const [isFocused, setIsFocused] = useState({
        email: false,
    })

    const handleBlur = (field) => {
        setIsFocused((prev) => ({
            ...prev,
            [field]: false,
        }))
    }

    const handleFocus = (field) => {
        setIsFocused((prev) => ({
            ...prev,
            [field]: true,
        }))
    }

    const handleEmailChange = (event) => {
        setEmailValue(event.target.value)
    }

    const isEmailEmpty = () => {
        return emailValue.trim() === ''
    }


  return (
    <div className={styles.email__form}>
        <div className={`${styles.email__form__container} _container`}>
            <div className={`${styles.email__form__email__block} ${styles.email__block}`}>
                <input 
                    type="email"
                    name="email"
                    value={emailValue}
                    onBlur={() => handleBlur('email')}
                    onFocus={() => handleFocus('email')}
                    onChange={handleEmailChange}
                    className={styles.email__block__input} 
                />
                <label 
                    className={!isEmailEmpty() || isFocused.email ? styles.email__block__placeholder__top  : styles.email__block__placeholder}
                >Введите ИИН</label>
            </div>

            <div className={`${styles.email__form__button} ${styles.button}`}>
                <button 
                    className={!isEmailEmpty() ? styles.button__btn : styles.button__btn__inactive}
                >
                    Войти
                </button>
            </div>  
        </div>
    </div>
  )
}

export default EmailForm
