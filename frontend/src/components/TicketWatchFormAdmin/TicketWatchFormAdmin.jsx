import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ithub from '../../../images/ithub.jpg'
import styles from './styles/TicketWatchFormAdmin.module.css'
import big_right_arrow from '../../../images/big_right_arrow.svg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


const backendServer = import.meta.env.VITE_BACKEND_SERVER || 'localhost:3000'

function TicketWatchFormAdmin() {

    const { id } = useParams()
    const [data, setData] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [textArea, setTextArea] = useState('')
    const textareaRef = useRef(null)
    const [isTextAreaClicked, setIsTextAreaClicked] = useState(false)
    const navigate = useNavigate()

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
        rejected: 'Отказано',
        done: 'Выполнено',
        inProgress: 'Выполняется',
        sent: 'Отправлено'
    })

    const TYPES = Object.freeze({
        complaint: 'Жалоба',
        offer: 'Предложение'
    })

    const truncateText = (text) => {
        return text?.length > 8 ? text.slice(0, 8) + '...' : text;
    }

    const truncateTextFamilyName = (text) => {
        return text?.length > 1 ? text.slice(0, 1) + '.' : text;
    }

    const isTextAreaEmpty = () => {
        return textArea.trim() === ''
    }

    useEffect(() => {


        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendServer}/confidant/ticket/${id}`, {
                    headers: { 
                        'Content-Type': 'application/json', 
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                setData(response?.data)
                setTextArea(response?.data?.comment || ''); // Устанавливаем текст комментария при загрузке данных
            } catch(error) {
                console.error(error)
            }
        }

        fetchData()
    }, [id])

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${backendServer}/image/getTicket/${id}`, {
                    responseType: 'blob', // Указываем, что ожидаем Blob (изображение)
                    headers: { 
                        'Content-Type': 'application/json', 
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                const url = URL.createObjectURL(response.data);
                setImageUrl(url); 
            } catch (error) {
                console.error(error);
            }
        };

        fetchImage();
    }, [id]);


    const handleSave = async () => {
        try {
            await axios.put(`${backendServer}/confidant/saveticket`, {
                id: id,
                comment: textArea,
                status: selected === 'Ожидание' ? 'Отправлено' : selected || data?.status,
            }, {
                headers: { 
                    'Content-Type': 'application/json', 
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            
            const response = await axios.get(`${backendServer}/confidant/ticket/${id}`, {
                headers: { 
                    'Content-Type': 'application/json', 
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            setData(response?.data);
    
            navigate('/main-page-admin');
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className={styles.ticket__watch__form__admin}>
      <div className={`${styles.ticket__watch__form__admin__container} _container`}>
        <div className={`${styles.ticket__watch__form__admin__fullname__block} ${styles.fullname__block}`}>
            <div className={`${styles.fullname__block__surname__block} ${styles.surname__block}`}>
                <h6 className={styles.surname__block__header}>Фамилия</h6>
                <p className={styles.surname__block__parg}>{truncateText(data?.surname)}</p>
            </div>
            <div className={`${styles.fullname__block__name__block} ${styles.name__block}`}>
                <h6 className={styles.name__block__header}>Имя</h6>
                <p className={styles.name__block__parg}>{truncateText(data?.name)}</p>
            </div>
            <div className={`${styles.fullname__block__patronymic__block} ${styles.patronymic__block}`}>
                <h6 className={styles.patronymic__block__header}>Отчество</h6>
                <p className={styles.patronymic__block__parg}>{truncateText(data?.patronymic)}</p>
            </div>
        </div>
        <div className={`${styles.ticket__watch__form__admin__headers__block} ${styles.headers__block}`}>
            <div className={`${styles.headers__block__title__block} ${styles.title__block}`}>
                <h6 className={styles.title__block__header}>Название</h6>
                <p className={styles.title__block__parg}>{data?.heading}</p>
            </div>
            <div className={`${styles.headers__block__type__block} ${styles.type__block}`}>
                <h6 className={styles.type__block__header}>Тип</h6>
                <p 
                    className={TYPES.complaint === data?.type 
                        ? styles.type__block__parg__red
                        : TYPES.offer === data?.type 
                        ? styles.type__block__parg__blue
                        : ''}
                >{data?.type}</p>
            </div>
            <div className={`${styles.headers__block__status__block} ${styles.status__block}`}>
                <h6 className={styles.status__block__header}>Статус</h6>
                <p 
                    className={STATUS.rejected === data?.status 
                            ? styles.status__block__parg__rejected
                            : STATUS.inProgress === data?.status 
                            ? styles.status__block__parg__inProgress
                            : STATUS.sent === data?.status
                            ? styles.status__block__parg__expectation
                            : STATUS.done === data?.status 
                            ? styles.status__block__parg__done 
                            : ''
                    }
                >{ data?.status === 'Отправлено' ? 'Ожидание' : data?.status}</p>
            </div>
        </div>

        <div className={`${styles.ticket__watch__form__admin__desc__block} ${styles.desc__block}`}>
            <div className={styles.desc__block__header}><span>Описание</span></div>
            <p className={styles.desc__block__description}>
                {data?.description}
            </p>
        </div>

        {imageUrl &&
            <div className={`${styles.ticket__watch__form__admin__image__block} ${styles.image__block}`}>
                <img className={styles.image__block__img} src={imageUrl} alt="uploaded" />
                <div className={styles.image__block__text}><span>Картинка</span></div>
            </div>
        }

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
                    <div className={`${isTextAreaClicked ? styles.text__area__block__block__text__family__name : styles.text__area__block__block__text__family__name__hidden }`}>{truncateTextFamilyName(data?.moderator_name)}{truncateTextFamilyName(data?.moderator_patronymic)} {truncateText(data?.moderator_surname)}</div>
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
                    <label className={`${isTextAreaClicked || textArea ? styles.text__area__block__block__placeholder__down : styles.text__area__block__block__placeholder}`}>Введите Комментарий к Тикету</label>
                </div>
            </div> 
        </div>

        <div className={`${styles.ticket__watch__form__admin__btn__block} ${styles.btn__block}`}>
            <Link to={'/main-page-admin'}>
                <button className={styles.btn__block__back__btn}>Назад</button>
            </Link>
            <button onClick={() => handleSave()} className={styles.btn__block__save__btn}>Сохранить</button>
        </div>
      </div>
    </div>
  )
}

export default TicketWatchFormAdmin
