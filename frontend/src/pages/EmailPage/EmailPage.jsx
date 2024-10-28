import React from 'react'
import Background from '../../components/Background/Background'
import Header from '../../components/Header/Header'
import EmailForm from '../../components/EmailForm/EmailForm'
import styles from './styles/EmailPage.module.css'
import ithub from '../../../images/ithub.jpg'

function EmailPage() {
  return (
    <div className={styles.email__page}>
      <Background src={ithub}>
        <Header />
        <EmailForm />
      </Background>
    </div>
  )
}

export default EmailPage
