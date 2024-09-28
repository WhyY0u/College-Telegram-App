import React, {useState} from 'react'
import styles from './styles/TicketCreationForm.module.css'
import arrow_right from '../../../../images/arrow_right.svg'

function TicketCreationForm() { 
    const [inputValue, setInputValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const options = ['Жалоба', 'Предложение']


    const toggleDropdown = () => setIsOpen(!isOpen)
    const handleSelect = (option) => {
        setSelected(option)
        setIsOpen(false)
    }
    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    const isInputEmpty = () => {
        return inputValue.trim() === ''
    }

    return (
        <div className={styles.ticket__creation__form}>
        <div className={`${styles.ticket__creation__form__container} _container`}>
            <form action='' className={`${styles.ticket__creation__form__form} ${styles.form}`}>
                <div className={styles.form__name__type__block}>
                    <div className={`${styles.form__name__type__block__input__container} ${styles.block__input}`}>
                        <input 
                            type="text"  
                            value={inputValue}
                            onChange={handleInputChange}
                            className={styles.block__input__input} 
                        />
                        <label className={`${isInputEmpty() ? styles.block__input__placeholder : styles.block__input__placeholder__top}`}>Название</label>
                    </div>
                    <div className={`${styles.form__name__type__block__dropdown} ${styles.dropdown}`}>
                        <div type='button' onClick={toggleDropdown} className={styles.dropdown__btn}> 
                            {selected || 'Тип'}
                            <img className={styles.dropdown__btn__img} src={arrow_right} alt="" />
                            {isOpen && (
                                <ul className={`${styles.dropdown__options} ${isOpen ? styles.show : ''}`}>
                                    {options.map(option => (
                                        <li className={styles.dropdown__options__item} key={option} onClick={() => handleSelect(option)}>
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

            </form>
        </div>
        </div>
    )
}

export default TicketCreationForm
