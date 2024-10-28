import React from 'react'
import Header from '../../components/Header/Header'
import styles from './styles/IinPage.module.css'
import IinForm from '../../components/IinForm/IinForm'
import ithub from "../../../images/ithub.jpg"
import Background from '../../components/Background/Background'

function IinPage() {
  return (
    <div className={styles.iin__page}>
      <Background src={ithub}>
        <Header />
        <IinForm />
      </Background>
    </div>
  )
}

export default IinPage
