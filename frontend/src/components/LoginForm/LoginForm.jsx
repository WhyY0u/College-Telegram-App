import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles/LoginForm.module.css';
import Unregistered from './components/Unregistered/Unregistered';
import EyeIcon from '../EyeIcon/EyeIcon';

function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const [inputValue, setInputValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const navigate = useNavigate()

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value)
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const isPasswordEmpty = () => {
    return passwordValue.trim() === ''
  }

  const isInputEmpty = () => {
    return inputValue.trim() === '';
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  const loginGet = {
    login: inputValue,
    password: passwordValue,
}
const handleSignIn = (event) => {
    event.preventDefault()
    axios.post(`http://localhost:3000/auth/login`, {
        ...loginGet
    })
    .then(response => {
      localStorage.setItem('token', response?.data)
      console.log(response?.data)
      navigate('/main-page-user')
    })
    .catch(error => console.error(error))
}

  return (
    <div className={styles.login__form}>
      <div className={`${styles.login__form__container} _container`}>
        <form action="" className={`${styles.login__form__form} ${styles.form}`}>
          <div className={styles.form__inputs}>
          <div className={styles.form__input__container}>
              <input
                type="text"
                className={styles.form__inputs__login}
                value={inputValue}
                onChange={handleInputChange}
              />
              <label className={`${ isInputEmpty() ? styles.form__inputs__placeholder : styles.form__inputs__placeholder__top}`}>Логин</label>
            </div>
            <div className={styles.form__inputs__password__block}>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                onBlur={() => setClicked(false)}
                onFocus={() => setClicked(true)}
                value={passwordValue}
                minLength={8}
                maxLength={30}
                onChange={handlePasswordChange}
                className={styles.form__inputs__password}
              />
              <label className={`${ isPasswordEmpty() ? styles.form__inputs__password__block__placeholder : styles.form__inputs__password__block__placeholder__top }`}>Пароль</label>
              <div className={styles.form__inputs__icon}>
                <EyeIcon 
                  isOpen={isPasswordVisible} 
                  toggleEye={togglePasswordVisibility} 
                  isClicked={isClicked}
                />
              </div>
            </div>
          </div>
          <a href="" className={styles.form__inputs__forgot__password__btn}>я забыл пароль</a>
          <div className={styles.form__signin__btn__block}>
            <button 
              type='submit'
              onClick={handleSignIn} 
              className={`${isInputEmpty() || isPasswordEmpty() ? styles.form__signin__btn__black : styles.form__signin__btn}`}
            >Войти</button>      
          </div>    
        </form>
        <Unregistered />
      </div>
    </div>
  );
}

export default LoginForm;
