import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ithub from '../../../images/ithub.jpg'
import styles from './styles/TicketWatchFormAdmin.module.css'
import big_right_arrow from '../../../images/big_right_arrow.svg'

function TicketWatchFormAdmin() {

    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [textArea, setTextArea] = useState('')
    const textareaRef = useRef(null)
    const [isTextAreaClicked, setIsTextAreaClicked] = useState(false)

    const toggleDropdown = () => setIsOpen(!isOpen)
    const handleSelect = (option) => {
        setSelected(option)
    }
    
    const handleTextareaChange = (event) => {
        setTextArea(event.target.value)
    }

    const handleTextareaToggle = () => setIsTextAreaClicked(!isTextAreaClicked)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '150px'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Устанавливаем высоту по содержимому
        }
    }, [textArea])


    const STATUS = Object.freeze({
        rejected: 'отказано',
        done: 'выполнено',
        inProgress: 'выполняется',
        sent: 'отправлено'
    })

    const TYPES = Object.freeze({
        complaint: 'Жалоба',
        offer: 'Предложение'
    })

    const truncateText = (text) => {
        return text.length > 8 ? text.slice(0, 8) + '...' : text;
    }

    const isTextAreaEmpty = () => {
        return textArea.trim() === ''
    }

  return (
    <div className={styles.ticket__watch__form__admin}>
      <div className={`${styles.ticket__watch__form__admin__container} _container`}>
        <div className={`${styles.ticket__watch__form__admin__fullname__block} ${styles.fullname__block}`}>
            <div className={`${styles.fullname__block__surname__block} ${styles.surname__block}`}>
                <h6 className={styles.surname__block__header}>Фамилия</h6>
                <p className={styles.surname__block__parg}>{truncateText('Попандопуло')}</p>
            </div>
            <div className={`${styles.fullname__block__name__block} ${styles.name__block}`}>
                <h6 className={styles.name__block__header}>Имя</h6>
                <p className={styles.name__block__parg}>{truncateText('Аристид')}</p>
            </div>
            <div className={`${styles.fullname__block__patronymic__block} ${styles.patronymic__block}`}>
                <h6 className={styles.patronymic__block__header}>Отчество</h6>
                <p className={styles.patronymic__block__parg}>{truncateText('Константинович')}</p>
            </div>
        </div>
        <div className={`${styles.ticket__watch__form__admin__headers__block} ${styles.headers__block}`}>
            <div className={`${styles.headers__block__title__block} ${styles.title__block}`}>
                <h6 className={styles.title__block__header}>Название</h6>
                <p className={styles.title__block__parg}>Убрать пары</p>
            </div>
            <div className={`${styles.headers__block__type__block} ${styles.type__block}`}>
                <h6 className={styles.type__block__header}>Тип</h6>
                <p 
                    className={styles.type__block__parg}
                    style={TYPES.complaint ? {color: 'rgba(255, 0, 0, 0.43)'} : ''}
                >{TYPES.complaint}</p>
            </div>
            <div className={`${styles.headers__block__status__block} ${styles.status__block}`}>
                <h6 className={styles.status__block__header}>Статус</h6>
                <p 
                    className={styles.status__block__parg}
                    style={STATUS.rejected ? {color: 'rgba(235, 4, 4, 0.69)'} : ''}
                >{STATUS.rejected}</p>
            </div>
        </div>

        <div className={`${styles.ticket__watch__form__admin__desc__block} ${styles.desc__block}`}>
            <div className={styles.desc__block__header}><span>Описание</span></div>
            <p className={styles.desc__block__description}>
            Место: Кабинет № 204
            <br />
            <br />
            Уважаемая администрация!
            <br />
            <br />
            Мы, ученики PO 232, обращаемся с просьбой обратить внимание на проблему, возникшую в нашем кабинете № 204. В последнее время одна из парт (номер 7) стала непригодной для использования
            </p>
        </div>

        <div className={`${styles.ticket__watch__form__admin__image__block} ${styles.image__block}`}>
            <img className={styles.image__block__img} src={ithub} alt="uploaded" />
            <div className={styles.image__block__text}><span>Картинка</span></div>
        </div>

        <div className={`${styles.ticket__watch__form__admin__status__dropdown} ${styles.status__dropdown}`}>
            <motion.div
                className={styles.status__dropdown__btn}
                onClick={toggleDropdown}
                animate={{ height: isOpen ? '110px' : '38px', width: isOpen ? '125px' : !isOpen && selected === null ? '170px' : isOpen && selected === null ? '170px' : '125px' }} // Измените '56px' на высоту кнопки
                transition={{ duration: 0.3 }}
            >
                <motion.div 
                    className={styles.status__dropdown__btn__text}
                    animate={{ textWrap: isOpen ? 'wrap' : 'no-wrap' }}
                    transition={{ duration: 0.3 }}
                >
                    {selected || 'Установить статус'}
                    <img className={`${isOpen ? styles.status__dropdown__btn__text__img__rotated : styles.status__dropdown__btn__text__img}`} src={big_right_arrow} alt="" />
                </motion.div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul 
                            className={styles.status__dropdown__options}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            >
                                <li 
                                    className={ selected === 'Отказано' 
                                        ? styles.dropdown__options__item__red 
                                        : styles.dropdown__options__item
                                    } 
                                    onClick={() => handleSelect('Отказано')}
                                >
                                    Отказано
                                </li>
                                <li 
                                    className={
                                    selected === 'Выполняется'
                                        ? styles.dropdown__options__item__blue
                                        : styles.dropdown__options__item
                                    } 
                                    onClick={() => handleSelect('Выполняется')}
                                >
                                    Выполняется
                                </li>
                                <li 
                                    className={
                                    selected === 'Выполнено'
                                        ? styles.dropdown__options__item__green
                                        : styles.dropdown__options__item
                                    } 
                                    onClick={() => handleSelect('Выполнено')}
                                >
                                    Выполнено
                                </li>
                                <li 
                                    className={
                                    selected === 'Ожидание'
                                        ? styles.dropdown__options__item__yellow
                                        : styles.dropdown__options__item
                                    } 
                                    onClick={() => handleSelect('Ожидание')}
                                >
                                    Ожидание
                                </li>
                        </motion.ul>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>

        <div className={`${styles.ticket__watch__form__admin__textarea__block} ${styles.text__area__block}`}>
            <div className={styles.text__area__block__block}>
                <div className={`${styles.text__area__block__block_text__block}`}>
                    <div 
                        className={styles.text__area__block__block__text}
                    >
                        <span className={`${isTextAreaClicked ? styles.text__area__block__block__text__left__span : styles.text__area__block__block__text__span}`}>Комментарий</span></div>      
                    <div className={`${isTextAreaClicked ? styles.text__area__block__block__text__family__name : styles.text__area__block__block__text__family__name__hidden }`}>А.С Пушкин</div>
                </div>
                <textarea 
                        name="" 
                        ref={textareaRef}
                        value={textArea}
                        onBlur={ isTextAreaEmpty() ? () => setIsTextAreaClicked(false) : () => setIsTextAreaClicked(true) }
                        onFocus={() => setIsTextAreaClicked(true)}
                        onChange={handleTextareaChange}
                        id=""
                        className={styles.text__area__block__block__textarea}
                ></textarea>
                <div className={styles.text__area__block__block__placeholder__block}>
                    <label className={`${isTextAreaClicked ? styles.text__area__block__block__placeholder__down : styles.text__area__block__block__placeholder}`}>Введите Комментарий к Тикету</label>
                </div>
            </div> 
        </div>

        <div className={`${styles.ticket__watch__form__admin__btn__block} ${styles.btn__block}`}>
            <button className={styles.btn__block__back__btn}>Назад</button>
            <button className={styles.btn__block__save__btn}>Сохранить</button>
        </div>
      </div>
    </div>
  )
}

export default TicketWatchFormAdmin
