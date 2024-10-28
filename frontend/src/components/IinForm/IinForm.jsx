import React, { useState } from 'react'
import styles from './styles/IinForm.module.css'

function IinForm() {
    const [iinValue, setIinValue] = useState('')
    const [isFocused, setIsFocused] = useState({
        iin: false,
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

    const handleIinChange = (event) => {
        setIinValue(event.target.value)
    }

    const isIinEmpty = () => {
        return iinValue.trim() === ''
    }


  return (
    <div className={styles.iin__form}>
        <div className={`${styles.iin__form__container} _container`}>
            <div className={`${styles.iin__form__iin__block} ${styles.iin__block}`}>
                <input 
                    type="number"
                    name="iin"
                    value={iinValue}
                    onBlur={() => handleBlur('iin')}
                    onFocus={() => handleFocus('iin')}
                    onChange={handleIinChange}
                    className={styles.iin__block__input} 
                />
                <label 
                    className={!isIinEmpty() || isFocused.iin ? styles.iin__block__placeholder__top  : styles.iin__block__placeholder}
                >Введите ИИН</label>
            </div>

            <div className={`${styles.iin__form__button} ${styles.button}`}>
                <button 
                    className={!isIinEmpty() ? styles.button__btn : styles.button__btn__inactive}
                >
                    Войти
                </button>
            </div>  
        </div>
    </div>
  )
}

export default IinForm
