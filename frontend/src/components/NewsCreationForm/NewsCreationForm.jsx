import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles/NewsCreationForm.module.css'
import arrow_left from '../../../images/NewsCreationPage/arrow_left.svg'
import arrow_right from '../../../images/arrow_right.svg';

function NewsCreationForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };


  return (
    <div className={styles.news__creation__form}>
        <div className={`${styles.news__creation__form__container} _container`}>
            <Link to={'/news-page-user'} className={styles.news__creation__form__back__btn}>
                <img  src={arrow_left} alt="arrow left" />
            </Link>

            <div className={`${styles.news__creation__form__form} ${styles.form}`}>
                <div className={styles.form__inputs}>
                    <div className={styles.form__inputs__header}>
                        <input className={styles.form__inputs__header__input} type="text" />
                        <label className={styles.form__inputs__header__placeholder}>Заголовок</label>
                    </div>
                    <div className={`${styles.form__inputs__type__block__dropdown} ${styles.dropdown}`}>
                            <motion.div 
                                type='button' 
                                onClick={toggleDropdown} 
                                className={styles.dropdown__btn}
                                animate={{ height: isOpen ? '100px' : '48px' }} 
                                transition={{ duration: 0.3 }}
                            > 
                                <div 
                                    className={ 
                                        selected === 'Жалоба' 
                                        ? styles.dropdown__btn__text__red 
                                        : selected === 'Предложение' 
                                            ? styles.dropdown__btn__text__blue
                                            : styles.dropdown__btn__text 
                                    }
                                >
                                    {selected || 'Тип'}
                                    <img 
                                        className={ isOpen ? styles.dropdown__btn__img__rotated : styles.dropdown__btn__img} 
                                        src={arrow_right} alt="" 
                                    />
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
                                                className={ selected === 'Жалоба' 
                                                    ? styles.dropdown__options__item__red 
                                                    : styles.dropdown__options__item
                                                } 
                                                onClick={() => handleSelect('Жалоба')}
                                            >
                                                Жалоба
                                            </li>
                                            <li 
                                                className={
                                                    selected === 'Предложение'
                                                        ? styles.dropdown__options__item__blue
                                                        : styles.dropdown__options__item
                                                } 
                                                onClick={() => handleSelect('Предложение')}
                                            >
                                                Предложение
                                            </li>
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                    </div>
                    <div className={styles.form__inputs__place}>
                        <input className={styles.form__inputs__place__input} type="text" />
                        <label className={styles.form__inputs__place__placeholder}>Место проведения</label>
                    </div>
                    <div className={styles.form__inputs__date}>
                        <input className={styles.form__inputs__date__datetime} type="datetime-local" id="datetime" name="datetime" />
                        <label className={styles.form__inputs__date__placeholder}>Когда</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewsCreationForm
