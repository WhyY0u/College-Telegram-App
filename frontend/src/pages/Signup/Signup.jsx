import React from 'react'
import Header from '../../components/Header/Header'
import styles from './styles/Signup.module.css'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import ithub from "../../../images/ithub.jpg"
import Background from '../../components/BackgroundGlobal/Background'

function Signup() {
  return (
    <div className={styles.signup}>
      <Background src={ithub}>
        <Header />
        <SignUpForm />
      </Background>
    </div>
  )
}

export default Signup
