import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken'
import styles from './styles/LoginForm.module.css';
import Unregistered from './components/Unregistered/Unregistered';
import EyeIcon from '../EyeIcon/EyeIcon';
import Validator from '../Validator/Validator';
import { callbackify } from 'util';

const backendServer = import.meta.env.VITE_BACKEND_SERVER || 'localhost:3000'


function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isClicked, setClicked] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [showValidator, setShowValidator] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [ErrorInput, setErrorInput] = useState('')
  const [ErrorPassword, setErrorPassword] = useState('')
  const [ErrorEmpty, setErrorEmpty] = useState('')
  const [Error, setError] = useState('')
  const [isFocused, setIsFocused] = useState({
    input: false,
    password: false,
  })

  const navigate = useNavigate()

  const handlePasswordChange = (event) => {
    setPasswordValue(event?.target.value)
  }

  const handleInputChange = (event) => {
    setInputValue(event?.target.value)
  }

  const isPasswordEmpty = () => {
    return passwordValue?.trim() === ''
  }

  const isInputEmpty = () => {
    return inputValue?.trim() === '';
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = (field) => {
    setIsFocused((prev) => ({...prev, [field]: true}))
  }

  const handleBlur = (field) => {
    setIsFocused((prev) => ({...prev, [field]: false}))
  }
  

  const loginGet = {
    login: inputValue,
    password: passwordValue,
  }


const handleSignIn = (event) => {
    event.preventDefault()
    setErrorEmpty('')
    setErrorInput('')
    setErrorPassword('')

    if (isInputEmpty() || isPasswordEmpty()) {
      setErrorEmpty('Пароль или логин не должны быть пустыми')
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)
      return;
    }
    if (inputValue.length < 3) {
      setErrorInput('Логин не должен быть меньше 3 символов')
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)
      return
    }

    if (passwordValue.length < 8) {
      setErrorInput('Пароль не должен быть меньше 8 символов')
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)
      return
    }
    axios.post(`${backendServer}/auth/login`, {
        ...loginGet
    })
    .then(response => {
      localStorage.setItem('token', response?.data)
      navigate('/');
    })
    .catch(error => {
      setErrorInput(error?.response?.data)
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)
      return
    })
}

  return (
    <div className={styles.login__form}>
      <div className={`${styles.login__form__container} _container`}>
        {ErrorEmpty && 
          <Validator text={ErrorEmpty} className={`${isVisible ? styles.login__form__login__validator : styles.login__form__hidden}`} />
        }
        {ErrorInput && 
          <Validator text={ErrorInput} className={`${isVisible ? styles.login__form__login__validator : styles.login__form__hidden}`} />
        }
        {ErrorPassword && 
          <Validator text={ErrorPassword} className={`${isVisible ? styles.login__form__login__validator : styles.login__form__hidden}`} />
        }
        {Error &&
          <Validator text={Error} className={`${isVisible ? styles.login__form__login__validator : styles.login__form__hidden}`} />
        }
        <form action="" className={`${styles.login__form__form} ${styles.form}`}>
          <div className={styles.form__inputs}>
            <div className={styles.form__input__container}>
              { !isFocused.input || !isInputEmpty() && 
                <label className={styles.form__inputs__validator}>{inputValue.length < 3 && 'Минимум 3 символа'}</label>
              }
              <input
                type="text"
                className={styles.form__inputs__login}
                value={inputValue}
                maxLength={30}
                onChange={handleInputChange}
                onFocus={() => handleFocus('input')}
                onBlur={() => handleBlur('input')}
              />
              <label className={`${ isInputEmpty() ? styles.form__inputs__placeholder : styles.form__inputs__placeholder__top}`}>Логин</label>
            </div>
            <div className={styles.form__inputs__password__block}>
              { !isFocused.password || !isPasswordEmpty() && 
                <label className={styles.form__inputs__password__validator}>{passwordValue.length < 8 && 'Минимум 8 символов'}</label>
              }
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                onBlur={() => {setClicked(false), handleBlur('password')}}
                onFocus={() => {setClicked(true), handleFocus('password')}}
                value={passwordValue}
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
          {/* <a href="" className={styles.form__inputs__forgot__password__btn}>я забыл пароль</a> */}
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
