import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './styles/SearchAndSortAdmin.module.css'

function SearchAndSortAdmin({ onSearch, onSort }) {
    const [inputValue, setInputValue] = useState('')
    const [isClicked, setIsClicked] = useState(false)
    const [selected, setSelected] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleInputChange = (event) => {
        const value = event.target.value
        setInputValue(value)
        onSearch(value)
    }

    const isInputEmpty = () => {
        return inputValue.trim() === ''
    }


    const toggleDropdown = () => setIsOpen(!isOpen)
    const handleSelect = (option) => {
        setSelected(option)
        onSort(option)
        setIsOpen(false)
    }

  return (
    <div className={styles.search__and__sort}>
        <div className={`${styles.search__and__sort__container} _container`}>
            <motion.div 
                className={`${styles.search__and__sort__search__container} ${styles.search__container}`}
                animate={{ width: isClicked ? '100%' : '90px' }} 
                transition={{ duration: 0.3 }}
            >
                <motion.input
                    animate={{ width: isClicked ? '100%' : '90px' }} 
                    transition={{ duration: 0.3 }}
                    type="text" 
                    value={inputValue}
                    onBlur={isInputEmpty() ? () => setIsClicked(false) : () => setIsClicked(true)}
                    onFocus={() => setIsClicked(true)}
                    onChange={handleInputChange}
                    className={`${isClicked ? styles.search__container__search__stretched : styles.search__container__search}`}
                />
                <label className={`${isInputEmpty() ? styles.search__container__placeholder : styles.search__container__placeholder__top}`}>Поиск</label>
            </motion.div>  
            <div 
                className={`${ isClicked ? styles.sort__container__dropdown__none : styles.sort__container__dropdown} ${styles.dropdown}`}
            >
                <motion.div
                    className={styles.dropdown__btn}
                    onClick={toggleDropdown}
                    animate={{ height: isOpen ? '85px' : '40px', width: isOpen ? '115px' : '115px'}} // Измените '56px' на высоту кнопки
                    transition={{ duration: 0.3 }}
                >
                    <div
                        className={styles.dropdown__btn__text}
                    >
                        {selected || 'Сортировка'}
                    </div>
                    <AnimatePresence>
                    {isOpen && (
                                    <motion.ul 
                                        className={styles.dropdown__options}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <li 
                                                className={ selected === 'Тип' 
                                                    ? styles.dropdown__options__item__red 
                                                    : styles.dropdown__options__item
                                                } 
                                                onClick={() => handleSelect('Тип')}
                                            >
                                                Тип
                                        </li>
                                        <li 
                                                className={
                                                    selected === 'Статус'
                                                        ? styles.dropdown__options__item__red
                                                        : styles.dropdown__options__item
                                                } 
                                                onClick={() => handleSelect('Статус')}
                                            >
                                                Статус
                                        </li>
                                    </motion.ul>
                                )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    </div>
  )
}

export default SearchAndSortAdmin
