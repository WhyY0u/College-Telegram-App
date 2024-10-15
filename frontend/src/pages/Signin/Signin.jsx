import React from 'react'
import Header from '../../components/Header/Header'
import styles from "./styles/Signin.module.css"
import LoginForm from '../../components/LoginForm/LoginForm'
import BouncingBallsAsync from '../../components/BouncingBalls/BoundcingBallsAsync/BouncingBallsAsync'

function Signin() {
  return (
    <div className={styles.signin}>
        <Header />
        <LoginForm />
    </div>
  )
}

export default Signin
