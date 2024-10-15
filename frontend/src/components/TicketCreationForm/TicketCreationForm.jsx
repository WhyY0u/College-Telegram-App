import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles/TicketCreationForm.module.css';
import arrow_right from '../../../images/arrow_right.svg';
import plus_icon from '../../../images/plus_icon.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const backendServer = import.meta.env.VITE_BACKEND_SERVER || 'localhost:3000'

function TicketCreationForm() {
    const [inputValue, setInputValue] = useState('');
    const [textArea, setTextArea] = useState('');
    const textareaRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // Состояние для URL изображения

    const navigate = useNavigate();

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleTextareaChange = (event) => {
        setTextArea(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file); // Сохраняем файл
            setImageUrl(URL.createObjectURL(file)); // Создаем URL для файла
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '50px'; // Сбрасываем высоту
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Устанавливаем высоту по содержимому
        }
    }, [textArea]);

    const isInputEmpty = () => {
        return inputValue.trim() === '';
    };

    const isTextareaEmpty = () => {
        return textArea.trim() === '';
    };

    const isImageEmpty = () => {
        return imageFile === null; // Проверяем наличие файла
    };

    const value = {
        heading: inputValue,
        image: imageFile, // Передаем файл вместо URL
        description: textArea,
        type: selected,
    };

    const handleSend = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('heading', value.heading);
        formData.append('description', value.description);
        formData.append('type', value.type);
        if (imageFile) {
            formData.append('image', imageFile); // Добавляем файл изображения
        }

        axios.post(`${backendServer}/user/createticket`, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data', // Указываем тип контента
            },
        })
        .then(response => {
            navigate('/main-page-user');
        })
        .catch(error => console.error(error));
    };

    return (
        <div className={styles.ticket__creation__form}>
            <div className={`${styles.ticket__creation__form__container} _container`}>
                <form className={`${styles.ticket__creation__form__form} ${styles.form}`}>
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
                    </div>
                    <div className={`${styles.form__name__type__block__image__container} ${styles.block__image}`}>
                        <input 
                            type='file'
                            className={styles.block__image__image} 
                            onChange={handleImageChange}
                            accept='image/*'
                            id='image-upload'
                        />
                        <div className={styles.block__image__placeholder__container}>
                            <label htmlFor='image-upload' className={styles.block__image__placeholder}>Фото</label>
                            <img className={styles.block__image__placeholder__img} src={plus_icon} alt="" />
                        </div>
                        {imageUrl &&
                        <div className={styles.block__image__imagePreview__container}>
                            <img src={imageUrl} alt="uploaded" className={styles.block__image__imagePreview} />   
                            <div className={styles.block__image__imagePreview__text}><span>Картинка</span></div>
                        </div>
                        }   
                    </div>
                    <div className={`${styles.form__name__type__block__textarea__container} ${styles.block__textarea}`}>
                        <textarea 
                            ref={textareaRef}
                            value={textArea}
                            onChange={handleTextareaChange}
                            className={styles.block__textarea__textarea}
                        ></textarea>
                        <label className={`${isTextareaEmpty() ? styles.block__textarea__placeholder : styles.block__textarea__placeholder__top}`}>Описание</label>
                    </div>

                    <div className={`${styles.ticket__creation__form__form__send__btn__block} ${styles.send__btn__block}`}>
                        <button
                            onClick={handleSend}
                            type='submit'
                            className={isInputEmpty() || selected === null || isTextareaEmpty() ? styles.send__btn__block__btn__black : styles.send__btn__block__btn}
                        >Отправить</button>                
                    </div>               
                </form>
            </div>
        </div>
    )
}

export default TicketCreationForm;
