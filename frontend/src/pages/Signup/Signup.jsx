import React from 'react'
import Header from '../../components/Header/Header'
import styles from './styles/Signup.module.css'
import SignUpForm from '../../components/SignUpForm/SignUpForm'

function Signup() {
  return (
    <div className={styles.signup}>
      <Header />
      <SignUpForm />
    </div>
  )
}

export default Signup
