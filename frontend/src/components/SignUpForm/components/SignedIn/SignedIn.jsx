import React from 'react'
import styles from './styles/SignedIn.module.css'
import { Link } from 'react-router-dom'

function SignedIn() {
  return (
    <div className={styles.signedin}>
        <div className={styles.signedin__text__block}>
            <div className={styles.signedin__text__block__question}>У вас есть аккаунт?</div>
            <p className={styles.signedin__text__block__parg}>если у вас уже есть аккунт войдите в него</p>
        </div>
        <Link to={'/signin'} className={styles.signedin__button__signin}>Войти</Link>
    </div>
  )
}

export default SignedIn
