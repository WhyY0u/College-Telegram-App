import React from 'react'
import Header from '../../components/Header/Header'
import styles from "./styles/Signin.module.css"
import LoginForm from '../../components/LoginForm/LoginForm'
import BouncingBallsAsync from '../../components/BouncingBalls/BoundcingBallsAsync/BouncingBallsAsync'
import Background from '../../components/BackgroundGlobal/Background'
import ithub from "../../../images/ithub.jpg"

function Signin() {
  return (
    <div className={styles.signin}>
      <Background src={ithub}>
        <Header />
        <LoginForm />
      </Background>
    </div>
  )
}

export default Signin
