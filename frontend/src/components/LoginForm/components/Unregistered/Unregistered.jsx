import React from 'react'
import styles from './styles/Unregistered.module.css'
import { Link } from 'react-router-dom'


function Unregistered() {
  return (
        <div className={styles.unregistered}>
            <div className={styles.unregistered__text__block}>
                <div className={styles.unregistered__text__block__question}>Вы тут впервые?</div>
                <p className={styles.unregistered__text__block__parg}>создайте аккаунт прямо сейчас</p>
            </div>
            <Link to={'/signup'} className={styles.unregistered__button__reg}>Зарегистриоваться</Link>
        </div>
  )
}

export default Unregistered
