import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles/ProfileForm.module.css'
import question_mark from '../../../images/question_mark.svg'

function ProfileForm() {
    const [textArea, setTextArea] = useState('')
    const textareaRef = useRef(null)
    const [profileImage, setProfileImage] = useState(question_mark); // Состояние для изображения
    const [isTextAreaClicked, setIsTextAreaClicked] = useState(false)
    const fileInputRef = useRef(null)
    const navigate = useNavigate()
    

    const handleTextareaChange = (event) => {
        setTextArea(event.target.value)
    }


    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '150px'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [textArea])

    useEffect(() => {
        if ((isTextAreaClicked && textareaRef.current)) {
            textareaRef.current.focus()
        }
    }, [isTextAreaClicked])

    const isTextAreaEmpty = () => {
        return textArea.trim() === ''
    }

    const handleEditToggle = () => {
        setIsTextAreaClicked(true)
    }

    const handleSave = () => {
        setIsTextAreaClicked(false) // Убираем фокус при сохранении
    }


    const handleLogOut = () => {
        localStorage.removeItem('token')
        navigate('/')
    }


    // Функция для обработки выбора изображения
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Устанавливаем изображение
            };
            reader.readAsDataURL(file); // Читаем изображение как Data URL
        }
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    return (
        <div className={styles.profile__form}>
            <div className={`${styles.profile__form__container} _container`}>
                <div className={`${styles.profile__form__name__block} ${styles.name__block}`}>
                    <div onClick={handleImageClick} className={`${ profileImage === question_mark ? styles.name__block__image : styles.name__block__image__main}`}>
                            <img
                                className={`${profileImage === question_mark ? styles.name__block__image__img : styles.name__block__image__img__main}`}
                                src={profileImage}
                                alt="Profile"
                                style={{ cursor: 'pointer' }} // Указатель курсора для интерактивности
                            />
                        <input
                            id="file-upload"
                            ref={fileInputRef}
                            type="file"
                            accept="image/*" // Принимаем только изображения
                            onChange={handleImageChange}
                            style={{ display: 'none' }} // Скрываем input
                        />                    
                    </div>
                    <div className={styles.name__block__about}>
                        <div className={styles.name__block__about__family__name}>Древов Даниил Николаевич</div>
                        <div className={styles.name__block__about__status}>Довереное лицо</div>
                    </div>
                </div>

                <div className={`${styles.profile__form__form__admin__textarea__block} ${styles.text__area__block}`}>
                    <div className={styles.text__area__block__block}>
                        <div className={`${styles.text__area__block__block_text__block}`}>
                            <div 
                                className={styles.text__area__block__block__text}
                            >
                                <span className={`${isTextAreaClicked ? styles.text__area__block__block__text__left__span : styles.text__area__block__block__text__span}`}>О себе</span>
                            </div>      
                        </div>
                        <textarea 
                            ref={textareaRef}
                            value={textArea}
                            disabled={!isTextAreaClicked} 
                            onChange={handleTextareaChange}
                            className={styles.text__area__block__block__textarea}
                        ></textarea>
                        <div className={styles.text__area__block__block__placeholder__block}>
                            <label className={`${isTextAreaClicked || !isTextAreaEmpty() ? styles.text__area__block__block__placeholder__down : styles.text__area__block__block__placeholder}`}>
                                Напишите информацию о себе
                            </label>
                        </div>
                    </div> 
                </div>
                
                <div className={`${styles.profile__form__buttons__block} ${styles.buttons__block}`}>
                    <div className={styles.buttons__block__edit__button}>
                        <button onClick={isTextAreaClicked ? handleSave : handleEditToggle} className={styles.buttons__block__edit__button__btn}>
                            {isTextAreaClicked ? 'Сохранить' : 'Редактировать'}
                        </button>
                    </div>
                    <div className={styles.buttons__block__logout__button}>
                        <button onClick={handleLogOut} className={styles.buttons__block__logout__button__btn}>Выйти</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileForm
