import React, { useState } from 'react'
import EyeIcon from '../EyeIcon/EyeIcon'
import styles from "./styles/SignUpForm.module.css"
import { useSignUpStates } from './hooks/useSignUpStates'
import SignedIn from './components/SignedIn/SignedIn'

function SignUpForm() {
  const {
    isPasswordVisible,
    isPasswordConfVisible,
    isClicked,
    isConfClicked,
    nameValue,
    surnameValue,
    inputValue,
    emailValue,
    passwordValue,
    passwordConfValue,
    setClicked,
    setConfClicked,
    handleNameChange,
    handleSurnameChange,
    handleInputChange,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordConfChange,
    isNameEmpty,
    isSurnameEmpty,
    isInputEmpty,
    isEmailEmpty,
    isPasswordEmpty,
    isPasswordConfEmpty,
    togglePasswordVisibility,
    togglePasswordConfVisibility
  } = useSignUpStates()


  return (
    <div className={styles.signup__form}>
        <div className={`${styles.signup__form__container} _container`}>
            <form action='' className={`${styles.signup__form__form} ${styles.from}`}>
                <div className={styles.form__inputs}>
                    <div className={styles.form__inputs__name__surname}>
                        <div className={styles.form__inputs__name__container}>
                            <input 
                                type="text" 
                                className={styles.form__inputs__name} 
                                value={nameValue}
                                onChange={handleNameChange}
                            />
                            <label className={`${ isNameEmpty() ? styles.form__inputs__name__placeholder : styles.form__inputs__name__placeholder__top}`}>Имя</label>
                        </div>
                        <div className={styles.form__inputs__surname__container}>
                            <input  
                                type="text" 
                                className={styles.form__inputs__surname} 
                                value={surnameValue}
                                onChange={handleSurnameChange}
                            />
                            <label className={`${ isSurnameEmpty() ? styles.form__inputs__surname__placeholder : styles.form__inputs__surname__placeholder__top }`}>Фамилия</label>
                        </div>
                    </div>
                    <div className={`${styles.form__inputs__login__container}`}>
                        <input 
                            type="text" 
                            className={styles.form__inputs__login} 
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <label className={`${isInputEmpty() ? styles.form__inputs__login__placeholder : styles.form__inputs__login__placeholder__top}`}>Логин</label>
                    </div>
                    <div className={`${styles.form__inputs__mail__container}`}>
                        <input 
                            type="email" 
                            className={styles.form__inputs__mail} 
                            value={emailValue}
                            onChange={handleEmailChange}
                        />
                        <label className={`${isEmailEmpty() ? styles.form__inputs__mail__placeholder : styles.form__inputs__mail__placeholder__top}`}>Почта</label>
                    </div>
                    <div className={styles.form__inputs__password__block}>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            onBlur={() => setClicked(false)}
                            onFocus={() => setClicked(true)}  
                            className={styles.form__inputs__password}
                            minLength={8}
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
                        <input
                            type={isPasswordConfVisible ? 'text' : 'password'} 
                            className={styles.form__inputs__confirmation__password}
                            onBlur={() => setConfClicked(false)}
                            onFocus={() => setConfClicked(true)}
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
                        type='button'
                        className={`${isNameEmpty() || isSurnameEmpty() || isInputEmpty() || isEmailEmpty() || isPasswordEmpty() || isPasswordConfEmpty() ? styles.form__signup__btn__black : styles.form__signup__btn}`}
                    >Зарегистрироваться</button>
                </div>
            </form>  

            <SignedIn />
        </div>
    </div>
  )
}

export default SignUpForm