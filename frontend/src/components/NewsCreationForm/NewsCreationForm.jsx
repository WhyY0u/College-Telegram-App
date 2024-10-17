import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import styles from './styles/NewsCreationForm.module.css';
import arrow_left from '../../../images/NewsCreationPage/arrow_left.svg';
import arrow_right from '../../../images/arrow_right.svg';
import date from '../../../images/NewsCreationPage/date.svg';
import plus_icon from '../../../images/NewsCreationPage/plus_icon.svg';
import Validator from '../Validator/Validator';

const backendServer = import.meta.env.VITE_BACKEND_SERVER || 'localhost:3000'

function NewsCreationForm() {
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Новость');

    const [isHeaderClicked, setIsHeaderClicked] = useState(false);
    const [headerValue, setHeaderValue] = useState('');

    const [isPlaceClicked, setIsPlaceClicked] = useState(false);
    const [placeValue, setPlaceValue] = useState('');

    const [dateValue, setDateValue] = useState('');
    const dateInputRef = useRef(null);
    const [currentDate] = useState(() => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); 
        return now.toISOString().slice(0, 16); // Формат YYYY-MM-DDTHH:MM
    }); 

    const [textArea, setTextArea] = useState('')
    const textareaRef = useRef(null)
    const [isTextAreaClicked, setIsTextAreaClicked] = useState(false)


    const [isVisible, setIsVisible] = useState(false)
    const [allErrors, setAllErrors] = useState('')
    const [headingError, setHeadingError] = useState('')
    const [placeError, setPlaceError] = useState('')
    const [dateError, setDateError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [imageError, setImageError] = useState('')
    const [imageLimitError, setImageLimitError] = useState('')

    const [isFocused, setIsFocused] = useState({
        heading: false,
        description: false,
        place: false,
        start: false,
    })

    const [images, setImages] = useState([])

    const handleImageChange = async (event) => {
        const files = Array.from(event.target.files);
        const newImages = [];
        let isValid = true; // Флаг для проверки валидности всех загружаемых изображений
        setImageError('');
        setImageLimitError('');
    
        if (images.length + files.length > 10) {
            setImageLimitError("Можно загрузить не более 10 изображений");
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 3000);
            return; // Прерываем выполнение, если превышен лимит
        }
    
        const validFiles = []; // Массив для хранения валидных файлов
        for (const file of files) {
            if (file.size > 2 * 1024 * 1024) { // 2 MB в байтах
                isValid = false; // Устанавливаем флаг в false, если файл превышает размер
                setImageError(`Изображение ${file.name} превышает 2 МБ.`);
                setIsVisible(true);
                setTimeout(() => {
                    setIsVisible(false);
                }, 3000);
                continue; // Пропускаем добавление этого файла
            }
            validFiles.push(file); // Добавляем валидные файлы
        }
    
        // Загружаем валидные файлы
        const imageLoadPromises = validFiles.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImages.push(reader.result);
                    resolve(); // Уведомляем, что загрузка завершена
                };
                reader.readAsDataURL(file);
            });
        });
    
        await Promise.all(imageLoadPromises); // Ждем, пока все файлы загрузятся
        setImages(prevImages => [...prevImages, ...validFiles]); // Сохраняем валидные файлы
        setImagePreviews(prev => [...prev, ...newImages]); // Для предварительного просмотра
    };
    
    

    const [imagePreviews, setImagePreviews] = useState([]);


    const handleTextareaChange = (event) => {
            setTextArea(event.target.value)
    }


    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '150px'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [textArea])


    const isTextAreaEmpty = () => {
        return textArea?.trim() === ''
    }


    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    const handleHeaderChange = (event) => {
        setHeaderValue(event?.target?.value);
    };

    const isHeaderEmpty = () => {
        return headerValue?.trim() === '';
    };

    const handlePlaceChange = (event) => {
        setPlaceValue(event?.target?.value);
    };

    const isPlaceEmpty = () => {
        return placeValue?.trim() === '';
    };

    const handleDateChange = (event) => {
        setDateValue(event.target.value);
    };

    const handleDateFocus = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker();
        }
    };


    const handleFocus = (field) => {
        setIsFocused((prev) => ({
            ...prev,
            [field]: true,
        }))
    }

    const handleBlur = (field) => {
        setIsFocused((prev) => ({
            ...prev,
            [field]: false,
        }))
    }


    const handleSaveNews = async (event) => {
        event.preventDefault();
        setAllErrors('')
        setHeadingError('')
        setDescriptionError('')
        

        if (isHeaderEmpty() || isTextAreaEmpty()) {
            setAllErrors("Заголовок и описание должны быть заполнены")
            setIsVisible(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 3000)
            return
        }

        if (headerValue.length < 5) {
            setHeadingError("Заголовок должен содержать не меньше 5 символов")
            setIsVisible(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 3000)
            return
        }

        if (textArea.length < 35) {
            setDescriptionError("Описание должно содержать не меньше 35 символов")
            setIsVisible(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 3000)
            return
        }

        const formData = new FormData();
        formData.append('heading', headerValue);
        formData.append('description', textArea);
        images.forEach((image) => {
            formData.append('images', image); // Добавляем каждый файл в FormData
        });


        try {
            await axios.post(`${backendServer}/confidant/saveNews`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            navigate('/news-page-user');
        } catch (error) {
            console.error('Ошибка при сохранении новости:', error);
        }
    };


    const handleSaveEvents = async (event) => {
        event.preventDefault();
        setAllErrors('')
        setHeadingError('')
        setPlaceError('')
        setDateError('')
        setDescriptionError('')
        

        if (isHeaderEmpty() || isTextAreaEmpty() || isPlaceEmpty() || dateValue.trim() === '') {
            setAllErrors("Все поля должны быть заполнены")
            setIsVisible(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 3000)
            return
        }

        if (headerValue.length < 5) {
            setHeadingError("Заголовок должен содержать не меньше 5 символов")
            setIsVisible(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 3000)
            return
        }

        if (textArea.length < 35) {
            setDescriptionError("Описание должно содержать не меньше 35 символов")
            setIsVisible(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 3000)
            return
        }

        if (placeValue.length < 1) {
            setPlaceError("Место должно содержать не меньше 1 символа")
            setIsVisible(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 3000)
            return
        }

        if (dateValue.trim() === "") {
            setDateError("Дата не должна быть пустой")
            setIsVisible(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 3000)
            return
        }

        

        const formData = new FormData();
        formData.append('heading', headerValue);
        formData.append('description', textArea);
        formData.append('place', placeValue);
        formData.append('start', dateValue);
        images.forEach((image) => {
            formData.append('images', image); // Добавляем каждый файл в FormData
        });

        try {
            await axios.post(`${backendServer}/confidant/saveEvent`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            navigate('/news-page-user');
        } catch (error) {
            console.error('Ошибка при сохранении мероприятия:', error);
        }
    };

    return (
        <div className={styles.news__creation__form}>
            <div className={`${styles.news__creation__form__container}`}>

                {headingError &&
                    <Validator text={headingError} className={`${isVisible ? styles.news__creation__form__validator : styles.news__creation__form__hidden}`} />                    
                }
                {allErrors &&
                    <Validator text={allErrors} className={`${isVisible ? styles.news__creation__form__validator : styles.news__creation__form__hidden}`} />                                        
                }
                {descriptionError &&
                    <Validator text={descriptionError} className={`${isVisible ? styles.news__creation__form__validator : styles.news__creation__form__hidden}`} />                                        
                }
                {placeError &&
                    <Validator text={placeError} className={`${isVisible ? styles.news__creation__form__validator : styles.news__creation__form__hidden}`} />                                        
                }
                {dateError &&
                    <Validator text={dateError} className={`${isVisible ? styles.news__creation__form__validator : styles.news__creation__form__hidden}`} />                                        
                }
                {imageError &&
                    <Validator text={imageError} className={`${isVisible ? styles.news__creation__form__validator : styles.news__creation__form__hidden}`} />                                        
                }
                {imageLimitError &&
                    <Validator text={imageLimitError} className={`${isVisible ? styles.news__creation__form__validator : styles.news__creation__form__hidden}`} />                                        
                }

                <Link to={'/news-page-user'} className={styles.news__creation__form__back__btn}>
                    <img src={arrow_left} alt="arrow left" />
                </Link>

                <div className={`${styles.news__creation__form__form} ${styles.form}`}>
                    <div className={styles.form__inputs}>
                        <div className={styles.form__inputs__first__block}>
                            <div className={styles.form__inputs__header}>
                                {!isFocused.heading || !isHeaderEmpty() &&
                                    <label className={styles.form__inputs__header__validator}>{headerValue.length < 5 && 'Мин. 5'}</label>                            
                                }
                                <input
                                    value={headerValue}
                                    onChange={handleHeaderChange}
                                    onBlur={() => {setIsHeaderClicked(false), handleBlur('heading')}}
                                    onFocus={() => {setIsHeaderClicked(true), handleFocus('heading')}}
                                    maxLength={20}
                                    className={styles.form__inputs__header__input}
                                    type="text"
                                />
                                <label
                                    className={`${isHeaderClicked || !isHeaderEmpty()
                                        ? styles.form__inputs__header__placeholder__top
                                        : styles.form__inputs__header__placeholder}`}
                                >
                                    Заголовок
                                </label>
                            </div>
                            <div className={`${styles.form__inputs__type__block__dropdown} ${styles.dropdown}`}>
                                <motion.div
                                    type='button'
                                    onClick={toggleDropdown}
                                    className={styles.dropdown__btn}
                                    animate={{ height: isOpen ? '100px' : '48px' }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className={
                                        selected === 'Мероприятие'
                                            ? styles.dropdown__btn__text__blue
                                            : selected === 'Новость'
                                                ? styles.dropdown__btn__text__cyan
                                                : styles.dropdown__btn__text
                                    }>
                                        {selected || 'Тип'}
                                        <img
                                            className={isOpen ? styles.dropdown__btn__img__rotated : styles.dropdown__btn__img}
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
                                                    className={selected === 'Мероприятие'
                                                        ? styles.dropdown__options__item__blue
                                                        : styles.dropdown__options__item}
                                                    onClick={() => handleSelect('Мероприятие')}
                                                >
                                                    Мероприятие
                                                </li>
                                                <li
                                                    className={
                                                        selected === 'Новость'
                                                            ? styles.dropdown__options__item__cyan
                                                            : styles.dropdown__options__item
                                                    }
                                                    onClick={() => handleSelect('Новость')}
                                                >
                                                    Новость
                                                </li>
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                        </div>

                        {selected === 'Мероприятие' && 
                            <div className={styles.form__inputs__second__block}>
                            <div className={styles.form__inputs__place}>
                                <input
                                    value={placeValue}
                                    onChange={handlePlaceChange}
                                    onBlur={() => {setIsPlaceClicked(false)}}
                                    onFocus={() => {setIsPlaceClicked(true)}}
                                    maxLength={30}
                                    className={styles.form__inputs__place__input}
                                    type="text"
                                />
                                <label
                                    className={isPlaceClicked || !isPlaceEmpty()
                                        ? styles.form__inputs__place__placeholder__top
                                        : styles.form__inputs__place__placeholder}
                                >
                                    Место проведения
                                </label>
                            </div>
                            <div className={styles.form__inputs__date}>
                                <input
                                    ref={dateInputRef}
                                    className={styles.form__inputs__date__datetime}
                                    type='datetime-local'
                                    min={currentDate}
                                    value={dateValue}
                                    onChange={handleDateChange}
                                />
                                <input
                                    type="text"
                                    value={dateValue ? new Date(dateValue).toLocaleString() : ''}
                                    onClick={handleDateFocus}
                                    readOnly // Запретить редактирование
                                    className={styles.form__inputs__date__text}
                                />
                                <label className={styles.form__inputs__date__placeholder}>
                                    {dateValue ? '' : 'Когда'}
                                </label>
                                <img 
                                    className={styles.form__inputs__date__placeholder__img} 
                                    src={!dateValue ? date : ''} 
                                    alt="" 
                                />
                            </div>
                        </div>
                        }
                    </div>
                </div>


                <div className={`${styles.form__form__textarea__block} ${styles.text__area__block}`}>
                    <div className={styles.text__area__block__block}>
                        <div className={`${styles.text__area__block__block_text__block}`}>
                            {!isFocused.description || !isTextAreaEmpty() &&
                                <label className={styles.text__area__block__block__validator}>{textArea.length < 35 && 'Минимум 35 символов'}</label>                            
                            }
                            <div 
                                className={ isTextAreaEmpty() ? styles.text__area__block__block__text : styles.text__area__block__block__text__left}
                            >
                                <span className={`${isTextAreaClicked || !isTextAreaEmpty() ? styles.text__area__block__block__text__left__span : styles.text__area__block__block__text__span}`}>Описание</span>
                            </div>      
                        </div>
                        <textarea 
                            ref={textareaRef}
                            value={textArea}
                            maxLength={2000}
                            onBlur={() => {
                                setIsTextAreaClicked(false),
                                handleBlur('description')
                            }}
                            onFocus={() => {
                                setIsTextAreaClicked(true),
                                handleFocus('description')
                            }}
                            onChange={handleTextareaChange}
                            className={styles.text__area__block__block__textarea}
                            
                        ></textarea>
                        <div className={styles.text__area__block__block__placeholder__block}>
                            <label className={`${isTextAreaClicked || textArea ? styles.text__area__block__block__placeholder__down : styles.text__area__block__block__placeholder}`}>
                                Ввведите описание
                            </label>
                        </div>
                    </div> 
                </div>


                <div className={`${styles.form__images} ${styles.images}`}>
                    <div className={styles.images__block}>
                            {imagePreviews.map((image, index) => (
                                <img key={index} src={image} alt={`Uploaded ${index}`} className={styles.images__block__imagePreview} />
                            ))}
                            {images.length < 10 && (
                                <>
                                    <label htmlFor="file-image">
                                        <div className={styles.images__block__add__button}>
                                            <img className={styles.images__block__add__button__btn} src={plus_icon} alt="Add" />
                                        </div>
                                    </label>
                                    <input 
                                        id="file-image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        multiple // Позволяет выбирать несколько файлов
                                        style={{ display: 'none' }} 
                                    />
                                </>
                            )}
                    </div>
                </div>

                <div className={`${styles.form__button__save}`}>
                    <button 
                        type='submit' 
                        onClick={selected === 'Новость' 
                        ? (event) => handleSaveNews(event) 
                        : selected === 'Мероприятие'
                        ? (event) => handleSaveEvents(event)
                        : () => console.log("Error during saving")
                    } 
                        className={styles.form__button__save__btn}
                    >Сохранить</button>
                </div>
            </div>
        </div>
    );
}

export default NewsCreationForm;
