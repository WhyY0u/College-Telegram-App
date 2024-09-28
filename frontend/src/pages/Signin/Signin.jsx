import React from 'react'
import Header from '../../components/Header/Header'
import styles from "./styles/Signin.module.css"
import LoginForm from '../../components/LoginForm/LoginForm'
import BouncingBalls from '../../components/BouncingBalls/BouncingBalls'

function Signin() {
  return (
    <div className={styles.signin}>
        <Header />
        <LoginForm />
        <BouncingBalls />
    </div>
  )
}

export default Signin
