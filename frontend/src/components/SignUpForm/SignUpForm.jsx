import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import EyeIcon from '../EyeIcon/EyeIcon'
import styles from "./styles/SignUpForm.module.css"
import { useSignUpStates } from './hooks/useSignUpStates'
import SignedIn from './components/SignedIn/SignedIn'
import Validator from '../Validator/Validator'

const backendServer = import.meta.env.VITE_BACKEND_SERVER || 'localhost:3000'

function SignUpForm() {

    const navigate = useNavigate()
    const [showValidator, setShowValidator] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isFocused, setIsFocused] = useState({
        name: false,
        surname: false,
        middlename: false,
        input: false,
        email: false,
        passwordVal: false,
        passwordConf: false,
    })

    const [allErrors, setAllErrors] = useState('')
    const [nameError, setNameError] = useState('')
    const [surnameError, setSurnameError] = useState('')
    const [middlenameError, setMiddlenameError] = useState('')
    const [inputError, setInputError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordLengthError, setPasswordLengthError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const {
        isPasswordVisible,
        isPasswordConfVisible,
        isClicked,
        isConfClicked,
        nameValue,
        surnameValue,
        middlenameValue,
        inputValue,
        emailValue,
        passwordValue,
        passwordConfValue,
        setClicked,
        setConfClicked,
        handleNameChange,
        handleSurnameChange,
        handleMiddlenameChange,
        handleInputChange,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordConfChange,
        isNameEmpty,
        isSurnameEmpty,
        isMiddlenameEmpty,
        isInputEmpty,
        isEmailEmpty,
        isPasswordEmpty,
        isPasswordConfEmpty,
        togglePasswordVisibility,
        togglePasswordConfVisibility
    } = useSignUpStates()


    const loginGet = {
        login: inputValue,
        email: emailValue,
        name: nameValue,
        surname: surnameValue,
        patronymic: middlenameValue,
        password: passwordValue,
    }


    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const handleRegister = (event) => {
        event.preventDefault()
        setAllErrors('')
        setNameError('')
        setSurnameError('')
        setMiddlenameError('')
        setInputError('')
        setEmailError('')
        setPasswordLengthError('')
        setPasswordError('')

        if (isNameEmpty() || isSurnameEmpty() || isMiddlenameEmpty() || isInputEmpty() || isEmailEmpty() || isPasswordEmpty() || isPasswordConfEmpty()) {
            setAllErrors('Все поля должны быть заполнены')
            setIsVisible(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 3000)
            return
        } 

        if (nameValue.length < 3) {
            setNameError('Имя должно содержать больше 3 символов')
            setIsVisible(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 3000)
            return
        }

        if (surnameValue.length < 3) {
            setSurnameError('Фамилия должна содержать больше 3 символов')
            setIsVisible(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 3000)
            return
        }

        if (middlenameValue.length < 3) {
            setMiddlenameError('Отчество должно содержать больше 3 символов')
            setIsVisible(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 3000)
            return
        }

        if (inputValue.length < 3) {
            setInputError('Логин должен содержать больше 3 символов')
            setIsVisible(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 3000)
            return
        }

        if (!emailValue.match(isValidEmail)) {
            setEmailError('Email должен быть корректным');
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 3000);
            return
        }

        if (passwordValue.length < 8) {
            setPasswordLengthError('Пароль должен содержать больше 8 символов');
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 3000);
            return
        }

        if (passwordValue !== passwordConfValue) {
            setPasswordError('Неверное подтверждение пароля');
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 3000);
            return
        }
        axios.post(`${backendServer}/auth/register`, {
            ...loginGet,
        })
        .then(response => {
            localStorage.setItem('token', response?.data)
            navigate('/main-page-user')
        })
        .catch(error => {
            console.error(error)
            console.log(error?.response?.data?.errors[0]?.msg)
        })
    }


    
    const handleFocus = (field) => {
        setIsFocused((prev) => ({...prev, [field]: true}))
    }

    const handleBlur = (field) => {
        setIsFocused((prev) => ({...prev, [field]: false}))
    }


  return (
    <div className={styles.signup__form}>
        <div className={`${styles.signup__form__container} _container`}>
            {allErrors &&
                <Validator text={allErrors} className={`${isVisible ? styles.signup__form__login__validator : styles.signup__form__hidden}`} />     
            }
            {nameError &&
                <Validator text={nameError} className={`${isVisible ? styles.signup__form__login__validator : styles.signup__form__hidden}`} />
            }
            {surnameError &&
                <Validator text={surnameError} className={`${isVisible ? styles.signup__form__login__validator : styles.signup__form__hidden}`} />
            }
            {middlenameError &&
                <Validator text={middlenameError} className={`${isVisible ? styles.signup__form__login__validator : styles.signup__form__hidden}`} />
            }
            {inputError &&
                <Validator text={inputError} className={`${isVisible ? styles.signup__form__login__validator : styles.signup__form__hidden}`} />
            }
            {emailError &&
                <Validator text={emailError} className={`${isVisible ? styles.signup__form__login__validator : styles.signup__form__hidden}`} />
            }
            {passwordLengthError &&
                <Validator text={passwordLengthError} className={`${isVisible ? styles.signup__form__login__validator : styles.signup__form__hidden}`} />
            }
            {passwordError &&
                <Validator text={passwordError} className={`${isVisible ? styles.signup__form__login__validator : styles.signup__form__hidden}`} />
            }
            <form className={`${styles.signup__form__form} ${styles.form}`}>
                <div className={styles.form__inputs}>
                    <div className={styles.form__inputs__name__surname}>
                        <div className={styles.form__inputs__name__container}>
                           
                                <label className={styles.form_input_validator_enable_animation + " " + (nameValue.length < 3 && (isFocused.name || !isNameEmpty()) ? styles.form__inputs__validator : styles.form__inputs__validator_hide)}>{'Мин. 3'}</label>                            
                            
                            <input 
                                type="text" 
                                className={styles.form__inputs__name} 
                                onFocus={() => handleFocus('name')}
                                onBlur={() => handleBlur('name')}
                                maxLength={50}
                                value={nameValue}
                                onChange={handleNameChange}
                            />
                            <label className={`${ isNameEmpty() ? styles.form__inputs__name__placeholder : styles.form__inputs__name__placeholder__top}`}>Имя</label>
                        </div>
                        <div className={styles.form__inputs__surname__container}>
                            <label className={styles.form_input_validator_enable_animation + " " + (surnameValue.length < 3 && (isFocused.surname || !isSurnameEmpty()) ? styles.form__inputs__validator : styles.form__inputs__validator_hide)}>{'Мин. 3'}</label>                            
                            <input  
                                type="text"
                                className={styles.form__inputs__surname}
                                onFocus={() => handleFocus('surname')}
                                onBlur={() => handleBlur('surname')}
                                value={surnameValue}
                                maxLength={50}
                                onChange={handleSurnameChange}
                            />
                            <label className={`${ isSurnameEmpty() ? styles.form__inputs__surname__placeholder : styles.form__inputs__surname__placeholder__top }`}>Фамилия</label>
                        </div>
                    </div>
                    <div className={styles.form__inputs__middlename__login}>
                        <div className={`${styles.form__inputs__middlename__container}`}>
                        <label className={styles.form_input_validator_enable_animation + " " + (middlenameValue.length < 3 && (isFocused.middlename || !isMiddlenameEmpty()) ? styles.form__inputs__validator : styles.form__inputs__validator_hide)}>{'Мин. 3'}</label>                            
                            <input 
                                type="text" 
                                className={styles.form__inputs__middlename} 
                                value={middlenameValue}
                                onFocus={() => handleFocus('middlename')}
                                onBlur={() => handleBlur('middlename')}
                                maxLength={50}
                                onChange={handleMiddlenameChange}
                            />
                            <label className={`${isMiddlenameEmpty() ? styles.form__inputs__middlename__placeholder : styles.form__inputs__middlename__placeholder__top}`}>Отчество</label>
                        </div>
                        <div className={`${styles.form__inputs__login__container}`}>
                            <label className={styles.form_input_validator_enable_animation + " " + (inputValue.length < 3 && (isFocused.input || !isInputEmpty()) ? styles.form__inputs__validator : styles.form__inputs__validator_hide)}>{'Мин. 3'}</label>                            

                            <input 
                                type="text" 
                                className={styles.form__inputs__login} 
                                value={inputValue}
                                onFocus={() => handleFocus('input')}
                                onBlur={() => handleBlur('input')}
                                maxLength={30}
                                onChange={handleInputChange}
                            />
                            <label className={`${isInputEmpty() ? styles.form__inputs__login__placeholder : styles.form__inputs__login__placeholder__top}`}>Логин</label>
                        </div>
                    </div>
                    <div className={`${styles.form__inputs__mail__container}`}>
                        <input 
                            type="email" 
                            className={styles.form__inputs__mail} 
                            value={emailValue}
                            maxLength={200}
                            onChange={handleEmailChange}
                        />
                        <label className={`${isEmailEmpty() ? styles.form__inputs__mail__placeholder : styles.form__inputs__mail__placeholder__top}`}>Почта</label>
                    </div>
                    <div className={styles.form__inputs__password__block}>
                    <label className={styles.form_input_validator_enable_animation + " " + (passwordValue.length < 3 && (isFocused.passwordVal || !isPasswordEmpty()) ? styles.form__inputs__validator : styles.form__inputs__validator_hide)}>{'Мин. 3'}</label>                            

                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            onBlur={() => {setClicked(false), handleBlur('passwordVal')}}
                            onFocus={() => {setClicked(true), handleFocus('passwordVal')}}  
                            className={styles.form__inputs__password}
                            maxLength={30}
                            value={passwordValue}
                            onChange={handlePasswordChange}
                        />
                        <label className={`${isPasswordEmpty() ? styles.form__inputs__password__placeholder : styles.form__inputs__password__placeholder__top}`}>Пароль</label>
                        <div className={styles.form__inputs__icon}>
                            <EyeIcon
                                isOpen={isPasswordVisible}
                                toggleEye={togglePasswordVisibility}
                                isClicked={isClicked}
                            />
                        </div>
                    </div>
                    <div className={styles.form__inputs__confirmation__password__block}>
                    <label className={styles.form_input_validator_enable_animation + " " + (passwordConfValue.length < 3 && (isFocused.passwordConf || !isPasswordConfEmpty()) ? styles.form__inputs__validator : styles.form__inputs__validator_hide)}>{'Мин. 3'}</label>                            

                        <input
                            type={isPasswordConfVisible ? 'text' : 'password'} 
                            className={styles.form__inputs__confirmation__password}
                            onBlur={() => {setClicked(false), handleBlur('passwordConf')}}
                            onFocus={() => {setClicked(true), handleFocus('passwordConf')}}  
                            value={passwordConfValue}
                            minLength={8}
                            maxLength={30}
                            onChange={handlePasswordConfChange}
                        />
                        <label className={`${isPasswordConfEmpty() ? styles.form__inputs__confirmation__password__placeholder : styles.form__inputs__confirmation__password__placeholder__top}`}>Подтвердите пароль</label>
                        <div className={styles.form__confirmation__inputs__icon}>
                            <EyeIcon 
                                isOpen={isPasswordConfVisible}
                                toggleEye={togglePasswordConfVisibility}
                                isClicked={isConfClicked}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.form__signup__btn__block}>
                    <button
                        type='submit'
                        className={`${isNameEmpty() || isSurnameEmpty() || isInputEmpty() || isEmailEmpty() || isPasswordEmpty() || isPasswordConfEmpty() ? styles.form__signup__btn__black : styles.form__signup__btn}`}
                        onClick={handleRegister}
                    >Зарегистрироваться</button>
                </div>
            </form>  

            <SignedIn />
        </div>
    </div>
  )
}

export default SignUpForm
